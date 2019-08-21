const functions = require('firebase-functions');
const express = require('express')
const app = express();
const messages = require('./features/networkResponses/networkResponses')

const postsRouter = require('./routers/posts')

app.use('/posts', postsRouter)


app.all('*', (req, res) => {
  res.status(404).send(messages.response404(req.originalUrl));
  return
});

exports.api = functions.https.onRequest(app)
