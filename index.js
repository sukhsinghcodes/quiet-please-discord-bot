// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const messagesToListenFor = ['quiet', 'yo', 'hey', 'mo'];

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['CHANNEL'] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async message => {

	if (message.author.bot) {
		return;
	}

	if (messagesToListenFor.some(msg => message.content.includes(msg))) {
		message.reply('Quiet plz!');
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);