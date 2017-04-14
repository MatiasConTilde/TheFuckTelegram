const TeleBot = require('telebot');
const bot = new TeleBot(process.env.API_KEY);

var messages = {};

bot.on("text", msg => {
  if (msg.text != "/fuck" && msg.text != "/fuck@TheFuckTelegramBot") {
    if (!messages[msg.chat.id]) messages[msg.chat.id] = {};
    messages[msg.chat.id][msg.from.id] = msg.text.split(" ");
    console.log(messages);
  }
});

bot.on("/fuck", msg => {
  console.log("fuck");
  return bot.sendMessage(msg.chat.id, messages[msg.chat.id][msg.from.id].join(" "));
});
bot.connect();

/*
var now = new Date().getTime();
const words = require("fs").readFileSync("./wiktionary", {
  encoding: "utf8"
}).split("\n");
console.log(words, "\n", new Date().getTime() - now);

now = new Date().getTime();
for (var i = 1; i < words.length; i++) {
  words[i] += words[i - 1];
}
console.log("\n", new Date().getTime() - now);
*/
