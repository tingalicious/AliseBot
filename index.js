// includes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

//instantiating new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//when client is ready execute
client.once('ready', () => {
	console.log('Ready!');
});

//Log bot into discord
client.login(token);
