// Require the necessary discord.js classes
import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { MessageCreate } from './events';

dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ['CHANNEL'],
});

const giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY);

const messageCreate = new MessageCreate(giphyFetch);

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Quiet Please bot online!');
});

client.on('messageCreate', messageCreate.onMessageCreate);

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
