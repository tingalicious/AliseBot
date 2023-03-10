const { SlashCommandBuilder } = require('@discordjs/builders');
//editing an existing bot reply
module.exports = {
    data: new SlashCommandBuilder()
        .setName('localized')
        .setDescription('Replies with localized hello world!'),
    async execute(interaction) {
        const locales = 
        {
            de: 'Hallo Welt!',
            zh: 'ni hao!',
        }
        await interaction.reply(localees[interaction.locale] ?? 'Hello World');
    },
};