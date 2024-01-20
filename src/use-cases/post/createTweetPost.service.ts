import { Injectable } from '@nestjs/common';
import { DataServices, Tweet, TweetPost } from '../../core';

@Injectable()
export class CreateTweetPostService {
  constructor(private dataServices: DataServices) {}

  async createTweetPost(tweet: Tweet) {
    for (const hashtag of tweet.hashtags) {
      const existingHashtag = await this.dataServices.tweetPosts.findByField(
        hashtag,
      );

      if (!existingHashtag) {
        const newHashtag: TweetPost = {
          hashtag,
          properties: [
            {
              tweetId: tweet.tweetId,
              content: tweet.content,
              createdAt: tweet.createdAt,
              hashtags: tweet.hashtags,
            },
          ],
        };

        await this.dataServices.tweetPosts.create(newHashtag);
      } else {
        const updateProperties = [
          ...existingHashtag.properties,
          {
            tweetId: tweet.tweetId,
            content: tweet.content,
            createdAt: tweet.createdAt,
            hashtags: tweet.hashtags,
          },
        ];

        await this.dataServices.tweetPosts.update(existingHashtag._id, {
          properties: updateProperties,
        });
      }
    }
  }
}
