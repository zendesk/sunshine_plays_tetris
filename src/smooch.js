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
  serviceUrl: process.env.SMOOCH_SERVICE_URL || undefined,
});

const MESSAGE_BASE = {
  type: 'text',
  text: '',
  role: 'appMaker',
  name: 'Smooch Tetris',
  avatarUrl: 'https://fxlemire.ngrok.io/assets/SmoochTetris.png',
};

exports.sendMessage = (userId, message) => {
  Smooch.appUsers.sendMessage(userId, {
    ...MESSAGE_BASE,
    text: message,
  });
};

exports.sendPayload = (userId) => {
  Smooch.appUsers.sendMessage(userId, {
    ...MESSAGE_BASE,
    actions: Object.keys(VALID_CHARACTERS).map(c => ({
      type: 'reply',
      text: VALID_CHARACTERS[c].icon,
      payload: c,
    })),
  });
};
