const SunshineCore = require('smooch-core');

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
    icon: '👇',
  },
};

exports.VALID_CHARACTERS = VALID_CHARACTERS;

const Sunshine = new SunshineCore({
  keyId: process.env.SUNSHINE_KEY_ID,
  secret: process.env.SUNSHINE_SECRET,
  scope: 'app',
  serviceUrl: process.env.SUNSHINE_SERVICE_URL || undefined,
});

const MESSAGE_BASE = {
  type: 'text',
  text: '',
  role: 'appMaker',
  name: 'Sunshine Tetris',
  avatarUrl: 'https://fxlemire.ngrok.io/assets/sunshine-tetris.png',
};

exports.sendMessage = (userId, message) => {
  Sunshine.appUsers.sendMessage(userId, {
    ...MESSAGE_BASE,
    text: message,
  });
};

exports.sendPayload = (userId) => {
  Sunshine.appUsers.sendMessage(userId, {
    ...MESSAGE_BASE,
    actions: Object.keys(VALID_CHARACTERS).map((c) => ({
      type: 'reply',
      text: VALID_CHARACTERS[c].icon,
      payload: c,
    })),
  });
};
