const {loadCommands} = require("../../Handlers/commandHandler");

module.exports={
    name: "ready",
    once: true,
    /**
     * 
     * @param {*} client 
     */
    execute(client){
        loadCommands(client);
        console.log("Client Ready");
    }
}