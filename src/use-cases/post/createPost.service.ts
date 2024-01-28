import { Injectable } from '@nestjs/common';
import {
  DataServices,
  Tweet,
  Facebook,
  Post,
  LoggersService,
} from '../../core';
import { PostFactoryService } from './post-factory.service';

@Injectable()
export class CreatePostService {
  constructor(
    private dataServices: DataServices,
    private postFactoryService: PostFactoryService,
    private loggersService: LoggersService,
  ) {}
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

    this.loggersService.info(
      `@@@ ${typeOfPost} post saved with id ${result._id}`,
    );
  }
}
