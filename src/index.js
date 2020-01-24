require('dotenv-safe').load();
const path = require('path');
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const { VALID_CHARACTERS, sendMessage, sendPayload } = require('./smooch');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.resolve('./pages/index.html')));
app.use('/assets', express.static('./assets'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);

const users = [];
let canRestart = false;

function handleKeys(message) {
  const channel = message.source.type;
  const sendKeys = (message.payload || message.text)
    .toLowerCase()
    .split('')
    .map((c) => VALID_CHARACTERS[c] && VALID_CHARACTERS[c].key)
    .filter((v) => v);

  if (sendKeys.length) {
    io.emit('command', {
      user: message.name,
      channel,
      keys: sendKeys,
    });
  }

  console.log(sendKeys);
}

app.post('/messages', async (req, res) => {
  if (!(req.body.messages && req.body.appUser)) {
    return;
  }

  const { appUser, messages } = req.body;
  let channel;

  messages.forEach((message) => {
    if (!users.includes(message.authorId)) {
      users.push(message.authorId);
    }

    channel = message.source.type;

    switch ((message.payload || message.text).toLowerCase()) {
      case 'r':
        if (canRestart) {
          io.emit('restart', {
            user: message.name,
            channel,
          });
          canRestart = false;
        }
        break;
      default:
        handleKeys(message);
        break;
    }
  });

  if (channel === 'viber') {
    sendPayload(appUser._id);
  }

  res.end();
});

io.on('connection', (socket) => {
  socket.on('gg', (score) => {
    canRestart = true;
    users.forEach((appUserId) => {
      sendMessage(appUserId, `Game Over! Score: ${score}`);
      sendMessage(appUserId, 'Send "r" to restart.');
    });
  });
});

server.listen(app.get('port'), (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(
    `Express server listening at http://localhost:${app.get('port')}`,
  );
  console.log(`env = ${app.get('env')}`);
});
