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
const fs= require('node:fs');
const path= require('node:path');

//Local Packages
const {loadEvents} = require("./Handlers/eventHandler");

//Clearing Commands/Events
client.events = new Collection();
client.commands= new Collection();

const commandsPath= path.join(__dirname, 'commands');
const commandFiles=fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Loading
loadEvents(client);

//Start Discord
client.login(process.env.DISCORD_TOKEN);

