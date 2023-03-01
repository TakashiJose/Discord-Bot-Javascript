const {EmbedBuilder} = require('discord.js');
const client= require('../index')

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
  client.distube
	.on('playSong', (queue, song) => queue.textChannel.send({embeds: [new EmbedBuilder()
            .setDescription(`| Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
    ]}))
    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [new EmbedBuilder()
        .setDescription(`| Added \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
    ]}))
    .on('addList', (queue, playlist) => queue.textChannel.send({embeds: [new EmbedBuilder()
        .setDescription(`| Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
    ]}))
    .on('error', (channel, e) => {channel.send({embeds:[new EmbedBuilder()
        .setDescription(`Error: ${e}`)]});
    })
    .on('empty', channel => channel.send({embeds: [new EmbedBuilder()
        .setDescription(`Empty channel`)
    ]}))
    .on('searchNoResult', (message, query) => message.channel.send({embeds: [new EmbedBuilder()
        .setDescription(`Song unavailable`)
    ]}))
    .on('finish', queue => queue.textChannel.send({embeds: [new EmbedBuilder()
        .setDescription(`Finished`)
    ]}))