// includes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

//instantiating new client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//instantiate a new collection of event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

//instantiate collection of commands
client.commands = new Collection();

//read files out of directory and filter to only .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//logic to loop through command Files & populate the client.commands 
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//logic to loop through event files
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//Log bot into discord
client.login(token);

