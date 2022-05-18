// Require the necessary discord.js classes
import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

import { GiphyFetch } from '@giphy/js-fetch-api';

dotenv.config();

const quietWords = ['quiet', 'quietings', 'quieting', 'allow that', 'allow it'];
const moWords = ['mo', 'mo?', 'mouhannad'];

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ['CHANNEL'],
});
console.log('Starting Quiet Please Bot...');

const giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY);

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }

  const words = message.content.split(' ');

  for (const word of words) {
    if (moWords.some((msg) => msg === word.toLowerCase())) {
      message.channel.send('Mo?');
      return;
    }
    if (quietWords.some((msg) => msg === word.toLowerCase())) {
      const { data: gif } = await giphyFetch.random({ tag: 'quiet please' });
      message.channel.send(`Quiet please!\n${gif.images.original.url}`);
      return;
    }
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
