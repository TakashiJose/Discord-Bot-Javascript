const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

