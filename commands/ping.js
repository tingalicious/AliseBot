const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with condie.jpg!'),
    async execute(interaction) {
        await interaction.reply('\:condie\:');
    },
};