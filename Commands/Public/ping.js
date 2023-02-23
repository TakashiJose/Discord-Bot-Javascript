const {ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will respond with pong."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction){
        console.log("working");
        interaction.reply("HELLO");
        interaction.editReply('helloo again');
    }
};