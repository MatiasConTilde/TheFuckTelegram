const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.API_KEY, {
  polling: true,
  filepath: false
});

var messages = {};

bot.onText(/^(?!\/fuck)/, (msg, exec) => {
  messages[msg.from.id] = msg.text.split(" ");
});

bot.onText(/\/fuck/, (msg, exec) => {
  bot.sendMessage(msg.chat.id, messages[msg.from.id].join(" "));
});
