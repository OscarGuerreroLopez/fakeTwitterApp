import { Injectable } from '@nestjs/common';
import { Post } from '../../core/entities';

@Injectable()
export class PostFactoryService {
  createNewPost(createPost: Post) {
    const newPost = new Post();
    newPost.content = createPost.content;
    newPost.createdAt = createPost.createdAt;
    newPost.hashtags = createPost.hashtags;
    newPost.originId = createPost.originId;
    newPost.platform = createPost.platform;
    newPost._id = createPost._id;

    return newPost;
  }
}
