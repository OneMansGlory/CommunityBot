var Discord = require('discord.js'),
    bot = new Discord.Client();
    var config = require('./config.json');
var trigger = "=";

    bot.on("ready", function () {
    	console.log("Ready to begin! Serving in " + bot.channels.length + " channels.");
    });

    bot.on("disconnected", function () {
    	console.log("Bot has disconnected. Exiting...");
    	process.exit(1); //exit node.js with an error
    });

    bot.on("error", function(error) {
      console.log("Caught error: " + error)
    });

    bot.on("message", function (msg) {
      //Stolen from STAR_BOT
      msgcount++
      if (msg.content[0] === trigger) {
        var command = msg.content.toLowerCase().split(" ")[0].substring(1);
        var suffix = msg.content.toLowerCase().substring(command.length + 2);
        var cmd = commands[command];
        if (cmd) {
          cmdcount++
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
  }
};


bot.login(Config.email, Config.password);
