const {SlashCommandBuilder,CommandInteraction, Client, MessageEmbed, Message} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const {DisTube} = require('distube');

module.exports={
    data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Music system")
    .addSubcommand(subcommand=>subcommand
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option=>option
            .setName("query")
            .setDescription("Provide a name or url for the song")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand=>subcommand
        .setName('volume')
        .setDescription('Alter the volume')
        .addIntegerOption(option=>option
            .setName("percent")
            .setDescription("10=10%")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand=>subcommand
        .setName('settings')
        .setDescription('Select an option.')
        .addStringOption(option=>option
            .setName("options")
            .setDescription("Select an option.")
            .setRequired(true)
            .addChoices(
                {name: "queue", value: "queue"},
                {name: "skip", value: "skip"},
                {name: "pause", value: "pause"},
                {name: "resume", value: "resume"},
                {name: "stop", value: "stop"},
            )
        )
    ),
    /**
     * 
     * @param {CommandInteraction} intearction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const { options, member, guild, channel, message}=interaction;
        const VoiceChannel= member.voice.channel;
        if(!VoiceChannel){
            return interaction.reply({content:"You must be in a voice channel", ephemeral: true});
        }

        try{
            switch(options.getSubcommand()){
                case "play":{
                    client.distube.play( VoiceChannel, options.getString("query"), {textChannel:channel, member: member});
                    return interaction.reply({content: "Request received."})
                }
                case "Volume":{
                    const Volume = options.getNumber("percent");
                    if(Volume>100||Volume<1){
                        return interaction.reply({content: "Invalid volume level", ephemeral: true});
                    }
                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `Volume has been set to \`${Volume}\``});
                }
                case "Settings":{
                    const queue = await client.distube.getQueue(VoiceChannel);
                    if(!queue){
                        return interaction.reply({content: "No queue available", ephemeral: true});
                    }
                    switch(options.getString("options")){
                        case "skip":{
                            await queue.skip(VoiceChanneL);
                            return interaction.reply({content: "Song skipped"});
                        }
                        case "pause":{
                            await queue.pause(VoiceChannel);
                            return interaction.reply({content: "Song paused"});
                        }
                        case "resume":{
                            await queue.resume(VoiceChannel);
                            return interaction.reply({content: "Song resumed"});
                        }
                        case "stop":{
                            await queue.stop(VoiceChannel);
                            return interaction.reply({content: "Song stopped"});
                        }
                        case "queue":{
                            return interaction.reply({
                                embeds: [new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`${queue.songs.map(
                                        (song,id)=>`\n**${id+1}**. ${song.name} - \`${song.formattedDuration}\``
                                    )}`)
                                ]
                            });
                        }
                    }
                    return;
                }
            }
        }catch(e){
            console.log(e);
            return interaction.reply({content: "error", ephemeral:true});
        }
    }
}