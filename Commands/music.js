const {SlashCommandBuilder,CommandInteraction, Client, EmbedBuilder, Message} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');


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
        .setName('queue')
        .setDescription('View queue')
    )
    .addSubcommand(subcommand=>subcommand
        .setName('skip')
        .setDescription('Skip song')
    )
    .addSubcommand(subcommand=>subcommand
        .setName('pause')
        .setDescription('Pause song')
    )
    .addSubcommand(subcommand=>subcommand
        .setName('resume')
        .setDescription('Resume song')
    )
    .addSubcommand(subcommand=>subcommand
        .setName('stop')
        .setDescription('Stop queue')
    ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {client} client 
     */
    async execute(interaction){
        const { options, member, guild, channel}=interaction;
        const VoiceChannel= member.voice.channel;
        const subcommand=options.getSubcommand();
        const client= require("../index");
        const queue = await client.distube.getQueue(VoiceChannel);

        if(!VoiceChannel){
            return interaction.reply({content:"You must be in a voice channel", ephemeral: true});
        }
        if(!member.voice.channelId==guild.members.me.voice.channelId){
            return interaction.reply({content: "Already in use"})
        }
        try{
            switch(subcommand){
                case "play":{
                    client.distube.play( VoiceChannel, options.getString("query"), {textChannel:channel, member: member});
                    return interaction.reply({content: "Request received."})
                }
                case "volume":{
                    const Volume = options.getNumber("percent");
                    if(Volume>100||Volume<1){
                        return interaction.reply({content: "Invalid volume level", ephemeral: true});
                    }
                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `Volume has been set to \`${Volume}\``});
                }
                case "skip":{
                    if(!queue){
                        return interaction.reply({content: "No queue available", ephemeral: true});
                    }
                    try{
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "Song skipped"});
                    }
                    catch(e){
                        await queue.stop(VoiceChannel)
                        return interaction.reply({content:"No more songs available"})
                    }

                }
                case "pause":{
                    if(!queue){
                        return interaction.reply({content: "No queue available", ephemeral: true});
                    }
                    await queue.pause(VoiceChannel);
                    return interaction.reply({content: "Song paused"});
                }
                case "resume":{
                    if(!queue){
                        return interaction.reply({content: "No queue available", ephemeral: true});
                    }
                    await queue.resume(VoiceChannel);
                    return interaction.reply({content: "Song resumed"});
                }
                case "stop":{
                    if(!queue){
                        return interaction.reply({content: "No queue available", ephemeral: true});
                    }
                    await queue.stop(VoiceChannel);
                    return interaction.reply({content: "Song stopped"});
                }
                case "queue":{
                    if(!queue){
                        return interaction.reply({content: "No queue available", ephemeral: true});
                    }
                    return interaction.reply({
                        embeds: [ new EmbedBuilder()
                            .setDescription(`${queue.songs.map(
                                (song,id)=>`\n**${id+1}**. ${song.name} - \`${song.formattedDuration}\``
                            )}`)
                        ]
                    });
                }
            }
            //check for queue
        }catch(e){
            console.log(e);
            return interaction.reply({content: "error", ephemeral:true});
        }
    }
}