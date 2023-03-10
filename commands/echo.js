const { SlashCommandBuilder } = require('@discordjs/builders');
//editing an existing bot reply
module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true)
            .addChoices(
                { name: 'Condie', value: 'condie.jpg' },
                { name: 'Pie', value: 'pie' },
            )
            .setMaxLength(2000))
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The Channel to echo into'))
        .addBooleanOption(option =>
            option.setName('ephemeral')
            .setDescription('Whether or not the echo should be ephemeral')),
    async execute(interaction) {
        await interaction.reply('\:condie\:');
        await wait(2000);
        await interaction.editReply('condiegov');
    },
};