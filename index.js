// includes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

//instantiating new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//when client is ready execute
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction; 

	if (commandName ==='ping'){
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

//Log bot into discord
client.login(token);

