const {ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will respond with pong."),
    async execute(interaction){
        await interaction.reply({content: 'Pong',ephemeral: true});
        
    }
};