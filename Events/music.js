const client= require("../index")
const {MessageEmbed} = require('discord.js');


const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`| Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
    ]}))

    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`| Added \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
    ]}))

    .on('addList', (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`| Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
    ]}))

    .on('error', (channel, e) => {channel.send({embeds:[new MessageEmbed()
        .setColor("RED")
        .setDescription(`Error: ${e}`)]});
    })

    .on('empty', channel => channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`Empty channel`)
    ]}))


    .on('searchNoResult', (message, query) => message.channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`Song unavailable`)
    ]}))

    .on('finish', queue => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`Finished`)
    ]}))