const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription(),
    async execute(interaction) {
        await interaction.reply(`User name: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};