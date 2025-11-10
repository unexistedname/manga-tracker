const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages
  ]
});

async function announcer(title, link, newChapter, image) {
    client.once('ready', async () => {
        const channel = await client.channels.fetch(process.env.channelId);

        const embed = new EmbedBuilder()
        .setTitle(`Update Manga: ${title}`)
        .setDescription(`Chapter ${newChapter}`)
        .setImage(image)
        .setURL(link)
        .setTimestamp();

        await channel.send({ embeds: [embed] });
    })
};
client.login(process.env.token);

module.exports = {announcer};