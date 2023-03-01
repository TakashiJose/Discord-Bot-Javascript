//Discord.js Packages
const { REST, Routes,Client, GatewayIntentBits, Partials, Collection, Events} = require('discord.js'); 
const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember} = Partials;

//Third Party Packages
require('dotenv').config();
const fs= require('node:fs');
const path= require('node:path');
const {DisTube} = require('distube');
const {SpotifyPlugin} = require("@distube/spotify");

//Setting client
const client= new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent], 
	partials: [User, Message, GuildMember, ThreadMember],
});

//Distube setup
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnFinish: false,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	leaveOnStop: true,
	plugins: [new SpotifyPlugin()],
});

module.exports=client;

//Clearing Commands/Events
client.events = new Collection();
client.commands= new Collection();
const rest=new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

//Command Files
const commandsPath= path.join(__dirname, 'commands');
const commandFiles=fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));
const commands=[];


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.BOT_ID),
			{body: commands},
		);
	} catch(error){
		console.error(error);
	}
})();


//Event Files
const eventsPath=path.join(__dirname, 'events');
const eventFiles= fs.readdirSync(eventsPath).filter(file=>file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Start Discord
client.login(process.env.DISCORD_TOKEN)

