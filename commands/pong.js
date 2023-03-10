const { SlashCommandBuilder } = require('@discordjs/builders');
//editing an existing bot reply
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pong')
        .setDescription('Replies with condie.jpg but edits to condiegov!'),
    async execute(interaction) {
        await interaction.reply('\:condie\:');
        await wait(2000);
        await interaction.editReply('condiegov');
        //retrieving the message object to pass out for later usage
        const message = await interaction.fetchReply();
        console.log(message);
    },
};