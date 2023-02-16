const { Client, GatewayIntentBits} = require('discord.js');
require('dotenv').config();
const {Distube} = require("distube");

const client = new Client(
    { intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});


client.login(process.env.DISCORD_TOKEN).then(()=>{
  console.log(`Logged in as ${client.user.tag}!`);
}).catch((err)=>console.log(err));