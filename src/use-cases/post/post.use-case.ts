import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DataServices, Tweet, Facebook, Post, TweetPost } from '../../core';
import { PostFactoryService } from './post-factory.service';

@Injectable()
export class PostUseCases {
  constructor(
    private dataServices: DataServices,
    private postFactoryService: PostFactoryService,
  ) {}

  @OnEvent('tweet')
  async handleTweetCreatedEvent(payload: Tweet) {
    const tweet = new Tweet();
    tweet.tweetId = payload.tweetId;
    tweet.content = payload.content;
    tweet.hashtags = payload.hashtags;
    tweet.createdAt = payload.createdAt;

    await this.createPost(tweet);
    await this.createTweetPost(tweet);
  }

  @OnEvent('facebook')
  handleFacebookCreatedEvent(payload: Facebook) {
    const facebookPost = new Facebook();
    facebookPost.postId = payload.postId;
    facebookPost.content = payload.content;
    facebookPost.hashtags = payload.hashtags;
    facebookPost.createdAt = payload.createdAt;
    this.createPost(facebookPost);
  }

  async createPost(params: Facebook | Tweet) {
    const { content, createdAt, hashtags } = params;
    const formattedPost = {} as Post;
    let typeOfPost;

    if (params instanceof Tweet) {
      formattedPost.originId = params.tweetId;
      formattedPost.platform = 'twitter';
      typeOfPost = 'tweet';
    }
    if (params instanceof Facebook) {
      formattedPost.originId = params.postId;
      formattedPost.platform = 'facebook';
      typeOfPost = 'facebook';
    }

    const newPost = this.postFactoryService.createNewPost({
      ...formattedPost,
      content,
      createdAt,
      hashtags,
    });

    const result = await this.dataServices.posts.create(newPost);

    console.log(`@@@ ${typeOfPost} post saved`, result._id);
  }

  async createTweetPost(tweet: Tweet) {
    console.log('@@@111', tweet.hashtags);

    for (const hashtag of tweet.hashtags) {
      console.log('@@@222', hashtag);

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
        console.log('@@@333', newHashtag.hashtag);
        await this.dataServices.tweetPosts.create(newHashtag);
        console.log('@@@444 newHashtag saved', newHashtag.hashtag);
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

        const updateResult = await this.dataServices.tweetPosts.update(
          existingHashtag._id,
          { properties: updateProperties },
        );

        console.log('@@@444 updateHashtag updated', updateResult);
      }
    }
  }

  async getPosts() {
    const result = await this.dataServices.posts.findAll();
    return result;
  }

  async getTweetPosts() {
    const result = await this.dataServices.tweetPosts.findAll();
    return result;
  }
}
