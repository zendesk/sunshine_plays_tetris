require('dotenv-safe').load();
const cors = require('cors');
const express = require('express');

const { sendKeys } = require('./sendKeys');
const { sendPayload } = require('./smooch');

const VALID_CHARACTERS = ['z', 'x', 'a', 's'];

const app = express();

app.use(cors());
app.use(express.json());
app.use('/assets', express.static('./assets'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 4000);


app.post('/messages', async (req, res) => {
  if (!(req.body.messages && req.body.appUser)) {
    return;
  }

  const { appUser, messages } = req.body;

  messages.forEach((message) => {
    const validChars = (message.payload || message.text).toLowerCase().split('').filter(c => VALID_CHARACTERS.includes(c)).join('');

    sendKeys(validChars);
  // console.log(validChars);
  });

  sendPayload(appUser._id); // eslint-disable-line no-underscore-dangle

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
