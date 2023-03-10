const { SlashCommandBuilder } = require('@discordjs/builders');
//deferring an existing bot reply
module.exports = {
    data: new SlashCommandBuilder()
        .setName('condiethink')
        .setDescription('Replies with condie.jpg after a delay and then deletes!'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        await wait(4000);
        //follow up message to initial reply - immediately follows up or edits a deferred reply
        await interaction.followUp('condiegov');
        //deleting a reply
        await interaction.deleteReply();
    },
};