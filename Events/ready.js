const {Events} = require('discord.js');

module.exports={
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {*} client 
     */
    execute(client){
        console.log("Client Ready");
    }
}