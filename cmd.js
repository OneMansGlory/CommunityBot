'use strict';

const config = require(./config.json)

exports.commands = {
  "ping": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "PONG");
    }
  },
  "pong": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "PING");
    }
  },
  "setgame": {
    process: function(bot, msg, suffix) {
      let evalWhitelist = require('./whitelist.json');
      if (evalWhitelist.indexOf(message.sender.id) > -1) {
        try {
          bot.setStatus('online', "Prefix: = Playing: " + suffix);
          bot.sendMessage(msg.channel, "Done! Now playing: " + suffix)
      } else {
      	  bot.sendMessage(message, "No permission!");
       }
     }
  },
  "setgame-idle": {
    process: function(bot, msg, suffix) {
      let evalWhitelist = require('./whitelist.json');
      if (evalWhitelist.indexOf(message.sender.id) > -1) {
        try {
      bot.setStatus('idle', "Prefix: = Playing: " + suffix);
      bot.sendMessage(msg.channel, "Done! Now playing: " + suffix + "Idle!")
      } else {
      	  bot.sendMessage(message, "No permission!");
       }
    }
  },
  "johncena": {
    process: function(bot, msg, suffix) {
      bot.sendMessage(msg.channel, " **AND HIS NAME IS** https://www.youtube.com/watch?v=4k1xY7v8dDQ");
    }
  },
  "join": {
    process: function(bot, message, suffix) {
      let query = suffix;
      let sender = message.author.username;
      if (!query) {
        bot.sendMessage(message.channel, "Please specify an invite link.");
        return;
      }
      let invite = message.content.split(" ")[1];
      bot.sendMessage(message.channel, "It seems you are trying to invite me using an invite link. Use this link instead: https://discordapp.com/oauth2/authorize?client_id=" + config.oauthid + "&scope=bot"); {
      });
    }
  },
  "hello": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "Hello there! I am CommunityBot, a bot made entirely by the community! Check out my innards here: https://github.com/OneMansGlory/CommunityBot.git. You can check out what I can do with my help command!")
    }
  },
  "eval": {
    process: function(bot, message, suffix) {
      let evalWhitelist = require('./whitelist.json');
      if (evalWhitelist.indexOf(message.sender.id) > -1) {
        try {
          bot.sendMessage(message, eval(suffix));
        } catch (err) {
					let array = [];
          array.push("*Eval failed.*");
					array.push('```');
					array.push(err);
          array.push(err.stack);
					array.push('```');
					bot.sendMessage(message, array);
        }
      } else {
        bot.sendMessage(message, "No permission!");
      }
    }
  },
  "help": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "Currently, I am in prealpha stages, and all I can do is respond to ping, pong, hello, and help.")
    }
  }
};
