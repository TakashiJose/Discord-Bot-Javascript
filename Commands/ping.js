const {ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will respond with pong."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.reply("HELLO");
    }
};