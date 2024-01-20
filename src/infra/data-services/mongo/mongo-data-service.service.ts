import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataServices } from '../../../core';
import { MongoGenericRepository } from './mongo-generic-repository';
import { Post, PostDocument, TweetPost, TweetPostDocument } from './model';

@Injectable()
export class MongoDataServices implements DataServices, OnApplicationBootstrap {
  posts: MongoGenericRepository<Post>;
  tweetPosts: MongoGenericRepository<TweetPost>;

  constructor(
    @InjectModel(Post.name)
    private PostRepository: Model<PostDocument>,

    @InjectModel(TweetPost.name)
    private TweetPostRepository: Model<TweetPostDocument>,
  ) {}

  onApplicationBootstrap() {
    this.posts = new MongoGenericRepository<Post>(this.PostRepository);
    this.tweetPosts = new MongoGenericRepository<TweetPost>(
      this.TweetPostRepository,
    );
  }
}
