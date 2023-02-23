//Discord.js Packages
const { Client, GatewayIntentBits, Partials, Collection, Events} = require('discord.js'); 
const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember} = Partials;

const client= new Client({
  intents: [Guilds, GuildMembers, GuildMessages], 
  partials: [User, Message, GuildMember, ThreadMember],
});

//Third Party Packages
require('dotenv').config();

//Local Packages
const {loadEvents} = require("./Handlers/eventHandler");

//Clearing Commands/Events
client.events = new Collection();
client.commands= new Collection();

//Loading
loadEvents(client);

//Start Discord
client.login(process.env.DISCORD_TOKEN);