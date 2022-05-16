// Polyfill for fetch
const fetch = require('node-fetch');
global.fetch = fetch;

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

const { GiphyFetch } = require('@giphy/js-fetch-api');

dotenv.config();

const messagesToListenFor = ['quiet', 'hey', 'mo', 'mo?'];

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['CHANNEL'] });

const giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY);

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async message => {

	if (message.author.bot) {
		return;
	}

	const words = message.content.split(' ');

	for (const word of words) {
		if (messagesToListenFor.some(msg => msg === word.toLowerCase())) {
			const { data: gif } = await giphyFetch.random({ tag: 'quiet please' });
			message.reply(`Quiet plz!\n${gif.images.original.url}`);
			return;
		}
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);