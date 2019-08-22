const functions = require('firebase-functions');
const express = require('express')
const app = express();
const messages = require('./features/networkResponses/networkResponses')

const commentsRouter = require('./routers/comments')
const likesRouter = require('./routers/likes')
const notificationsRouter = require('./routers/notifications')
const postsRouter = require('./routers/posts')
const usersRouter = require('./routers/users')

app.use('/comments', commentsRouter)
app.use('/likes', likesRouter)
app.use('/notifications', notificationsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)


app.all('*', (req, res) => {
  res.status(404).send(messages.response404(req.originalUrl));
  return
});

exports.api = functions.https.onRequest(app)
