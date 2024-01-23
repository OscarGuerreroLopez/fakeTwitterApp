import { Injectable } from '@nestjs/common';
import { DataServices, Tweet, Facebook, TweeterServices } from '../../core';
import { CreatePostService } from './createPost.service';
import { CreateTweetPostService } from './createTweetPost.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PostUseCases {
  constructor(
    private dataServices: DataServices,
    private createPostService: CreatePostService,
    private createTweetPostService: CreateTweetPostService,
    private tweeterListenerService: TweeterServices,
  ) {
    this.tweeterListenerService.tweetHandler(this.handleTweet);
  }

  handleTweet = async (payload: Tweet) => {
    const tweet = new Tweet();
    tweet.tweetId = payload.tweetId;
    tweet.content = payload.content;
    tweet.hashtags = payload.hashtags;
    tweet.createdAt = payload.createdAt;

    await this.createPostService.createPost(tweet);
    await this.createTweetPostService.createTweetPost(tweet);
  };

  @OnEvent('facebook')
  handleFacebookCreatedEvent(payload: Facebook) {
    const facebookPost = new Facebook();
    facebookPost.postId = payload.postId;
    facebookPost.content = payload.content;
    facebookPost.hashtags = payload.hashtags;
    facebookPost.createdAt = payload.createdAt;
    this.createPostService.createPost(facebookPost);
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
