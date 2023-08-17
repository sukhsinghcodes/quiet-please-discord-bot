import { GiphyFetch } from '@giphy/js-fetch-api';
import { Message } from 'discord.js';

export class MessageCreate {
  private quietWords = [
    'quiet',
    'quiet!',
    'quietings',
    'quietings!',
    'quieting',
    'quieting!',
    'shh',
    'shh!',
    'shhh',
    'shhh!',
  ];
  private moWords = ['mo', 'mo?', 'mouhannad', 'mouhannad!', 'mo!', 'mouhannad?'];
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
        message.reply({ content: 'Quiet Please!', files: [gif.images.fixed_height.url] });
        return;
      }
    }
  };
}
