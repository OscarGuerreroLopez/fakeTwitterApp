import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataServices } from '../../../core';
import { MongoGenericRepository } from './mongo-generic-repository';
import { Post, PostDocument } from './model';

@Injectable()
export class MongoDataServices implements DataServices, OnApplicationBootstrap {
  posts: MongoGenericRepository<Post>;

  constructor(
    @InjectModel(Post.name)
    private PostRepository: Model<PostDocument>,
  ) {}

  onApplicationBootstrap() {
    this.posts = new MongoGenericRepository<Post>(this.PostRepository);
  }
}
