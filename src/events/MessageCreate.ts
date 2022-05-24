import { GiphyFetch } from '@giphy/js-fetch-api';
import { Message } from 'discord.js';

export class MessageCreate {
  private quietWords = ['quiet', 'quietings', 'quieting'];
  private moWords = ['mo', 'mo?', 'mouhannad', 'mouhannad!', 'mo!'];
  private giphyFetch: GiphyFetch;

  constructor(giphyFetch) {
    this.giphyFetch = giphyFetch;
  }

  public onMessageCreate = async (message: Message<boolean>): Promise<void> => {
    if (message.author.bot) {
      return;
    }

    const words = message.content.split(' ');

    for (const word of words) {
      if (this.moWords.some((msg) => msg === word.toLowerCase())) {
        message.channel.send('Mo?');
        return;
      }
      if (this.quietWords.some((msg) => msg === word.toLowerCase())) {
        const { data: gif } = await this.giphyFetch.random({ tag: 'quiet please' });
        message.channel.send(`Quiet please!\n${gif.images.original.url}`);
        return;
      }
    }
  };
}
