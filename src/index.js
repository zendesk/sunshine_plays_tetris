require('dotenv-safe').load();
const path = require('path');
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const { sendKeys } = require('./sendKeys');
const { VALID_CHARACTERS, sendPayload } = require('./smooch');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.resolve('./pages/index.html')));
app.use('/assets', express.static('./assets'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);

app.post('/messages', async (req, res) => {
  if (!(req.body.messages && req.body.appUser)) {
    return;
  }

  const { appUser, messages } = req.body;
  // const { messages } = req.body;
  let channel;

  messages.forEach((message) => {
    channel = message.source.type;

    const sentKeys = (message.payload || message.text)
      .toLowerCase()
      .split('')
      .map(c => VALID_CHARACTERS[c] && VALID_CHARACTERS[c].key)
      .filter(v => v)
      .map(sendKeys);

    if (sentKeys.length) {
      io.emit('command', {
        user: message.name,
        keys: sentKeys,
      });
    }

    console.log(sentKeys);
  });

  if (channel === 'viber') {
    sendPayload(appUser._id); // eslint-disable-line no-underscore-dangle
  }

  res.end();
});

server.listen(app.get('port'), (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Express server listening at http://localhost:${app.get('port')}`);
  console.log(`env = ${app.get('env')}`);
});
