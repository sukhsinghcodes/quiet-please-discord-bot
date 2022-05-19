import { Message } from 'discord.js';
import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY);

const quietWords = ['quiet', 'quietings', 'quieting'];
const moWords = ['mo', 'mo?', 'mouhannad', 'mouhannad!', 'mo!'];

export async function onMessageCreate(message: Message<boolean>): Promise<void> {
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
}
