const {REST, Routes} = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({version: '10'}).setToken(TOKEN);

(async ()=>{
    try {
        console.log('Started refreshing application (/) commands.');
        
    }
})