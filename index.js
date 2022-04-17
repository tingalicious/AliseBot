// includes
const { REST } = require('@discordjs/rest');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');

//instantiating new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//instantiate a new collection of event handlers
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//instantiate collection of commands
client.commands = new Collection();

//read files out of directory and filter to only .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//when client is ready execute
/* client.once('ready',  c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
}); */

//setup of command file refresh
const rest = new REST({ version: '9'}).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {

	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered in an interaction.`);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName); 

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
	}
});


//Log bot into discord
client.login(token);

