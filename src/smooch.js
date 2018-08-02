const SmoochCore = require('smooch-core');

const Smooch = new SmoochCore({
  keyId: process.env.SMOOCH_KEY_ID,
  secret: process.env.SMOOCH_SECRET,
  scope: 'app',
});

const ACTIONS = {
  text: '',
  role: 'appMaker',
  name: 'Smooch Tetris',
  avatarUrl: 'https://http://fxlemire.ngrok.io/static/SmoochTetris.png',
  actions: [{
    type: 'reply',
    text: '👈',
    payload: 'a',
  }, {
    type: 'reply',
    text: '👉',
    payload: 's',
  }, {
    type: 'reply',
    text: '↪',
    payload: 'z',
  }, {
    type: 'reply',
    text: '↩',
    payload: 'x',
  }],
};

exports.sendPayload = (userId) => {
  Smooch.appUsers.sendMessage(userId, ACTIONS);
};
