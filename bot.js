var Discord = require('discord.js'),
    bot = new Discord.Client(),
    Config = require('./config.json');

bot.on('message', function(msg) {
  if (msg.content === "=ping") {
    bot.sendMessage(msg.channel, "Pong!");
  }
});

bot.login(Config.email, Config.password);
