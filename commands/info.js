const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
	.setName('info')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server')),
    async execute(interaction){
        await interaction.deferReply({ ephemeral: true });
        await wait(4000);
        //follow up message to initial reply - immediately follows up or edits a deferred reply
        await interaction.followUp('subcommands processed');
        //deleting a reply
        await interaction.deleteReply();
    }
    }