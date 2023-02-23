const{ChatInputCommandInteraction} = require("discord.js");

module.exports={
    name: "interactionsCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {*} client 
     */
    execute(interaction, client){
        console.log("SLash Command");
        if(!InteractionCollector.isChatInputCommand()) return;
        const command= client.commands.get(interaction.commandName);
        if(!command) return interaction.reply({
            content: "This command is outdated.",
            ephemeral: true,
        });
        if(command.developer && interaction.user.id !== "219337289661284352"){
            return interaction.reply({
                content: "This command is only available to the developer.",
                ephemeral: true,
            });
        }
        command.execute(interaction, client);
    }
}