'use strict';

    let upvote = 0;
     let downvote = 0;
      let voter = [];
      let votebool = false;
      let topicstring = "";

const config = require('./config.json');

exports.commands = {
  "ping": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "PONG");
    }
  },
  "newvote": {
    process: function (bot, msg, suffix) {
      if (!suffix) { bot.sendMessage(msg.channel, "Include a suffix please!"); return; }
      if (votebool == true) { bot.sendMessage(msg, "Theres already a vote pending!"); return; }
      topicstring = suffix;
      bot.sendMessage(msg, "New Vote started: `" + suffix + "`\nTo vote say `" + AuthDetails.discordjs_trigger + "vote +/-`");
      votebool = true;
    }
  },
  "vote": {
    process: function (bot, msg, suffix) {
      if (!suffix) { bot.sendMessage(msg, "Gotta vote for something!"); return; }
      if (votebool == false) { bot.sendMessage(msg, "There is not a vote in progress. Start one with the 'newvote' command."); return; }
      if (voter.indexOf(msg.author) != -1) { return; }
      voter.push(msg.author);
      var vote = suffix.split(" ")[0]
      if (vote == "+") { upvote += 1; }
      if (vote == "-") { downvote += 1; }
    }
  },
  "votestatus": {
    process: function(bot, msg) {
      var msgArray = [];
      if (votebool == true) {bot.sendMessage(msg.channel, "There **Is** a vote in progress. Error reading topic string.")}
        else {
          bot.sendMessage(msg.channel, "There is currently **not** a vote in progress.")
        }
    }
  },
  "endvote": {
    process: function (bot, msg, suffix) {
      bot.sendMessage(msg, "**Results of last vote:**\nTopic: `" + topicstring + "`\nVotes for: `" + upvote + "`\nVotes against: `" + downvote + "`");
      upvote = 0;
      downvote = 0;
      voter = [];
      votebool = false;
      topicstring = "";
    }
  },
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
  "setgame-idle": {
    process: function(bot, msg, suffix) {
      bot.setStatus('idle', "Prefix: = Playing: " + suffix);
      bot.sendMessage(msg.channel, "Done! Now playing: " + suffix + "Idle!")
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
      };
    }
  },
  "hello": {
    process: function(bot, message) {
      bot.sendMessage(message.channel, "Hello there! I am CommunityBot, a bot made entirely by the community! Check out my innards here: https://github.com/OneMansGlory/CommunityBot.git. You can check out what I can do with my help command!")
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
