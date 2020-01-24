# Sunshine Plays Tetris®!

This is a chat-powered multiplayer cooperative Tetris game made possible by [Zendesk Sunshine Conversations](https://smooch.io).

## Prerequisites

### Zendesk Sunshine Conversations Account

- Create a [Sunshine account](https://smooch.io/signup/) if you don't already have one, or [log into it](https://app.smooch.io/login).
- Create a new app (you may follow along [this documentation](https://docs.smooch.io/guide/api-quickstart/)).
- In your new app, go to the `Settings` tab and create new [API key](https://docs.smooch.io/guide/authentication-overview/#api-keys).

### Environment Variables

In the root of your project, make a copy of the `.env.example` file and name it `.env` (`cp .env.example .env`)

#### HOST

Tunnel to your localhost (e.g. [ngrok](https://ngrok.com/)) that should listen to your specified PORT (e.g. 3000).

```bash
ngrok http 3000
# will output an URL like https://2e3d7aa5.ngrok.io which can be used as a value
```

#### PORT (optional)

Port on which your local server will listen to. Defaults to 3000.

#### SUNSHINE_KEY_ID and SUNSHINE_SECRET

- The corresponding values of your newly created API key ID and secret

#### What your final `.env` should look like

```bash
HOST=https://my-random-ngrok.ngrok.io # or undefined
PORT=3000
SUNSHINE_KEY_ID=app_my-random-sunshine-key-id
SUNSHINE_SECRET=my-random-sunshine-secret
```

### Integrations

On your Sunshine account dashboard, go to the `Integrations` tab.

#### Webhooks

- Select the `Webhooks` integration and click on `Configure`, then `Create a webhook`.
- In the `Webhook URL` text box, paste your tunnel URL followed by `/messages`, e.g. `https://2e3d7aa5.ngrok.io/messages`
- Select `All basic triggers`
- Click `Create webhook`

#### Your preferred channel

Make an integration with your favorite channel. The channel that provides the best experience to play _Sunshine Plays Tetris!_ is [Viber](https://www.viber.com/), but we also recommend other channels like [Messenger](https://messenger.com), [Telegram](https://telegram.org/) and [Line](https://line.me/en/) for their ease of integration.

Once you are done with your integrations, make sure you link to them [in the website](./pages/index.html) (go to the _README_ section in the div with id `channels`).

### ❤️ Tetris®

That's it for the prerequisites!

## Start

Run the following commands in your terminal:

```bash
npm install # first-time setup
npm start
```

Then visit your tunnel URL or http://localhost:3000 (or your custom `PORT`).
