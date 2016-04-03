'use strict';

const config = require('./config.json');

const Discord = require('discord.js');
const fs = require('fs');
const trigger = (config.prefix);

try {
	require('./config.json');
} catch (e) {
	console.log("config.json not found. Copying from config-base.json...");
	fs.writeFileSync('./config.json', fs.readFileSync('./config-base.json'));
}

let commands = require('./cmd.js').commands;
let bot = new Discord.Client();

bot.on("ready", function () {
	console.log("Ready to begin! Serving in " + bot.channels.length + " channels.");
});

bot.on("disconnected", function () {
	console.log("Bot has disconnected. Exiting...");
	process.exit(0); //exit node.js without an error cuz CI will complain if we don't use valid credentials
});

bot.on("error", function (error) {
	console.log("Caught error: " + error);
});

bot.on("message", function (message) {
	let msg = message.content;
	if (msg[0] === trigger) {
		let command = msg.toLowerCase().split(" ")[0].substring(1);
		let suffix = msg.substring(command.length + 2);
		if (commands[command]) commands[command].process(bot, message, suffix);
	}
});

bot.loginWithToken(config.token);
