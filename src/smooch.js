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
  avatarUrl: 'https://http://fxlemire.ngrok.io/assets/SmoochTetris.png',
  actions: [{
    type: 'reply',
    text: '👈',
    payload: 'q',
  }, {
    type: 'reply',
    text: '👉',
    payload: 'w',
  }, {
    type: 'reply',
    text: '↩',
    payload: 'e',
  }, {
    type: 'reply',
    text: '👇',
    payload: 'd',
  }],
};

exports.sendPayload = (userId) => {
  Smooch.appUsers.sendMessage(userId, ACTIONS);
};
