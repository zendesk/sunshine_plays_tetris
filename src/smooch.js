const SmoochCore = require('smooch-core');

const VALID_CHARACTERS = {
  q: {
    key: 'left',
    icon: '👈',
  },
  w: {
    key: 'right',
    icon: '👉',
  },
  a: {
    key: 'z',
    icon: '↺',
  },
  s: {
    key: 'x',
    icon: '↻',
  },
  z: {
    key: 'down',
    icon: '👎',
  },
};

exports.VALID_CHARACTERS = VALID_CHARACTERS;

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
  actions: Object.keys(VALID_CHARACTERS).map(c => ({
    type: 'reply',
    text: VALID_CHARACTERS[c].icon,
    payload: c,
  })),
};

exports.sendPayload = (userId) => {
  Smooch.appUsers.sendMessage(userId, ACTIONS);
};
