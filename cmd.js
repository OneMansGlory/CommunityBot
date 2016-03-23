'use strict';

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
      bot.setStatus('online', "Prefix: = Playing: " + suffix);
      bot.sendMessage(msg.channel, "Done! Now playing: " + suffix)
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
      bot.joinServer(invite, function(error, server) {
        if (error) {
          bot.sendMessage(message.channel, "Something went wrong. Error code: " + error);
        } else {
          bot.sendMessage(message.channel, "Great! I just joined: " + server);
          let messageArray = [];
          messageArray.push("Hi! I'm **" + bot.user.username + "**. I was invited to this server by " + message.author + ".");
          messageArray.push("You can use `" + trigger + "help` to see what I can do.");
          messageArray.push("If you don't want me here, please use the " + AuthDetails.discordjs_trigger + "leave command to get me out.");
          bot.sendMessage(server.defaultChannel, messageArray);
          console.log("Joined server: " + server)
        }
      });
    }
  },
  "hello": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "Hello there! I am CommunityBot, a bot made entirely by the community! Check out my innards here: http://gitlab.com/OneMansGlory/CommunityBot. You can check out what I can do with my help command!")
    }
  },
  "eval": {
    process: function(bot, message, suffix) {
      let evalWhitelist = require('./evalwhitelist.json');
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
