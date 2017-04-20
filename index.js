const TeleBot = require("telebot");
const bot = new TeleBot(process.env.API_KEY);
const fs = require("fs");
const Typo = require("typo-js");
const dictionary = new Typo("en_US");

var config;
fs.readFile("/config", function(err, data) {
  if (err) config = {};
  else config = JSON.parse(data);
});
var messages = {};
const commands = ["/fuck", "/config"];

bot.on(commands[0], msg => {
  bot.sendMessage(msg.chat.id, messages[msg.chat.id][msg.from.id].join(" "));
});

bot.on(commands[1], msg => {
  config[msg.chat.id] = msg.text.substr(commands[1].length + 1);
  fs.writeFile("config.json", JSON.stringify(config), err => {});
  bot.sendMessage(msg.chat.id, config[msg.chat.id]);
});

bot.on("text", msg => {
  if (notCommand(msg.text)) {
    if (!messages[msg.chat.id]) messages[msg.chat.id] = {};
    messages[msg.chat.id][msg.from.id] = msg.text.split(" ");
    const msgArray = messages[msg.chat.id][msg.from.id];
    for (var i in msgArray) {
      const suggestion = dictionary.suggest(msgArray[i])[0] || msgArray[i];
      messages[msg.chat.id][msg.from.id][i] = suggestion;
    }
  }
});

bot.connect();

function notCommand(txt) {
  for (var i in commands) {
    if (txt.substr(0, commands[i].length) === commands[i]) {
      return false;
    }
  }
  return true;
}
