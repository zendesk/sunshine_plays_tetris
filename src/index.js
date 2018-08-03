require('dotenv-safe').load();
const cors = require('cors');
const express = require('express');

const { sendKeys } = require('./sendKeys');
const { sendPayload } = require('./smooch');

const VALID_CHARACTERS = {
  q: 'left',
  w: 'right',
  a: 'z',
  s: 'x',
  z: 'down',
};

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', express.static('./tetris'));
app.use('/assets', express.static('./assets'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 4000);


app.post('/messages', async (req, res) => {
  if (!(req.body.messages && req.body.appUser)) {
    return;
  }

  // const { appUser, messages } = req.body;
  const { messages } = req.body;

  messages.forEach((message) => {
    console.log((message.payload || message.text)
      .toLowerCase()
      .split('')
      .map(c => VALID_CHARACTERS[c])
      .filter(v => v)
      .map(sendKeys));
  });

  // sendPayload(appUser._id); // eslint-disable-line no-underscore-dangle

  res.end();
});

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Express server listening at http://localhost:${app.get('port')}`);
  console.log(`env = ${app.get('env')}`);
});
