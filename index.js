// includes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

//instantiating new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


//instantiate collection of commands
client.commands = new Collection();

//read files out of directory and filter to only .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//when client is ready execute
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { command } = client.commands.get(interaction.commandName); 

	if (!command) return;

	try {
		await command.execute(interacation);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
	}
});


//Log bot into discord
client.login(token);

