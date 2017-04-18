const TeleBot = require("telebot");
const bot = new TeleBot(process.env.API_KEY);

const Typo = require("typo-js");
const dictionary = new Typo("en_US");

var messages = {};

bot.on("text", msg => {
  if (msg.text != "/fuck" && msg.text != "/fuck@TheFuckTelegramBot") {
    if (!messages[msg.chat.id]) messages[msg.chat.id] = {};
    messages[msg.chat.id][msg.from.id] = msg.text.split(" ");
    const msgArray = messages[msg.chat.id][msg.from.id];
    for (var i in msgArray) {
      const suggestion = dictionary.suggest(msgArray[i])[0] || msgArray[i];
      messages[msg.chat.id][msg.from.id][i] = suggestion;
    }
  }
});

bot.on("/fuck", msg => {
  bot.sendMessage(msg.chat.id, messages[msg.chat.id][msg.from.id].join(" "));
});

bot.connect();
