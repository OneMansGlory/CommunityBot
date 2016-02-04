var Discord = require('discord.js'),
    bot = new Discord.Client();
    var config = require('./config.json');
var trigger = "=";

    bot.on("ready", function () {
    	console.log("Ready to begin! Serving in " + bot.channels.length + " channels.");
    });

    bot.on("disconnected", function () {
    	console.log("Bot has disconnected. Exiting...");
    	process.exit(0); //exit node.js without an error cuz CI will complain if we don't use valid credentials
    });

    bot.on("error", function(error) {
      console.log("Caught error: " + error)
    });

    bot.on("message", function (msg) {
      //Stolen from STAR_BOT
      if (msg.content[0] === trigger) {
        var command = msg.content.toLowerCase().split(" ")[0].substring(1);
        var suffix = msg.content.toLowerCase().substring(command.length + 2);
        var cmd = commands[command];
        if (cmd) {
          cmd.process(bot, msg, suffix);
        } if (msg.content === trigger + "ping") {
          bot.sendMessage(msg.channel, "PONG.")
        }
      }
      });

var commands = {
  "pong": {
    process: function(bot, msg) {
      bot.sendMessage(msg.channel, "Die in a hole.")
    }
  },
  "hello": {
  process: function(bot, msg) {
  bot.sendMessage(msg.channel, "Hello there! I am CommunityBot, a bot made entirely by the community! Check out my innards here: http://gitlab.com/OneMansGlory/CommunityBot. You can check out what I can do with my help command!")
  }
 },
 "help": {
 process: function(bot, msg) {
 bot.sendMessage(msg.channel, "Currently, I am in prealpha stages, and all I can do is respond to ping, pong, hello, and help.")
 }
 }
};


bot.login(Config.email, Config.password);
