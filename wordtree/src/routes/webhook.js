import express from 'express';
import linebot from 'linebot';
import secret from '../public/secret'

const router = express.Router();

const bot = linebot({
  channelId: secret.channelId,
  channelSecret: secret.channelSecret,
  channelAccessToken: secret.channelAccessToken
});

const linebotParser = bot.parser();
router.post('/', linebotParser);

bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log('Success', data);
  }).catch(function (error) {
    console.log('Error', error);
  });
});

export default router;