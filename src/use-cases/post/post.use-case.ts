import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DataServices, Tweet, Facebook } from '../../core';
import { PostFactoryService } from './post-factory.service';

@Injectable()
export class PostUseCases {
  constructor(
    private dataServices: DataServices,
    private postFactoryService: PostFactoryService,
  ) {}

  @OnEvent('tweet')
  handleTweetCreatedEvent(payload: Tweet) {
    this.createTweetPost(payload);
  }

  @OnEvent('facebook')
  handleFacebookCreatedEvent(payload: Facebook) {
    this.createFacebookPost(payload);
  }

  async createTweetPost(params: Tweet) {
    const { tweetId, ...rest } = params;
    const post = this.postFactoryService.createNewPost({
      originId: tweetId,
      platform: 'twitter',
      ...rest,
    });

    const result = await this.dataServices.posts.create(post);

    console.log('@@@tweet saved', result._id);
  }

  async createFacebookPost(params: Facebook) {
    const { postId, ...rest } = params;
    const post = this.postFactoryService.createNewPost({
      originId: postId,
      platform: 'facebook',
      ...rest,
    });

    const result = await this.dataServices.posts.create(post);

    console.log('@@@facebook post saved', result._id);
  }

  async getPosts() {
    const result = await this.dataServices.posts.findAll();
    return result;
  }
}
