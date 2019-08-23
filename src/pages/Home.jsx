import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI Components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

// MUI Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LocationOn from "@material-ui/icons/LocationOn";
import Url from "@material-ui/icons/Link";
import Edit from "@material-ui/icons/Edit";

// Assets
import AppIcon from "../assets/images/icon.svg";
import Me from "../assets/images/CharlieO.jpg";

const styles = {
  card: {
    display: "flex",
    marginBottom: "1.5rem"
  },
  cardAction: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    margin: "0 .5rem "
  },
  iconButton: {
    margin: "0 .5rem "
  },
  image: {
    minWidth: "200px",
    maxHeight: "250px",
    objectFit: "cover"
  },
  profileImage: {
    borderRadius: "50%",
    width: "180px",
    height: "180px"
  }
};

class Home extends Component {
  componentDidMount() {
    axios
      .get("/getPosts")
      .then(result => console.log(result.data))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { userHandle, theme } = this.props; // Change this to state when ready
    console.log(theme);

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <Card className={classes.card}>
            <Hidden smDown>
              <CardMedia image={Me} title="Charlie O" className={classes.image} />
            </Hidden>
            <CardContent>
              <Box m={2}>
                <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
                  Charlie O.
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                  September 14, 2018
                </Typography>
                <Typography variant="body2" component="p">
                  This is my first post on this app.
                </Typography>
              </Box>
              <CardActions className={classes.cardAction}>
                <Box className={classes.iconButton}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <small>2 Likes</small>
                </Box>
                <Box className={classes.iconButton}>
                  <IconButton aria-label="add to favorites">
                    <CommentIcon />
                  </IconButton>
                  <small>4 Comments</small>
                </Box>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <Box display="flex" justifyContent="center" marginY={2}>
              <CardMedia
                className={classes.profileImage}
                component="img"
                alt="Charlie O."
                image={Me}
                title="Charlie O."
              />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={2}>
              <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
                @Charlie O.
              </Typography>

              <Typography variant="body2">
                This is my bio I come from a place far far far away from a distant galaxy. Hello hello
              </Typography>

              <Box display="flex" alignItems="center" justifyContent="center">
                <LocationOn className={classes.icon} color="primary" />
                {" Brisbane, Aus"}
              </Box>

              <Button variant="text" color="primary" size="small">
                <Url className={classes.icon} />
                {"www.charlietheprogrammer.com"}
              </Button>

              <Box display="flex" alignItems="center" justifyContent="center">
                <CalendarToday className={classes.icon} color="primary" />
                {" Joined Mar 2020"}
              </Box>
            </Box>
            <Box textAlign="right">
              <IconButton size="small" color="primary">
                <Edit className={classes.icon} />
              </IconButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
