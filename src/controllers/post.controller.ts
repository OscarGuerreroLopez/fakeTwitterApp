import { Controller, Get } from '@nestjs/common';

import { PostUseCases } from '../use-cases/post/post.use-case';

@Controller('posts')
export class PostController {
  constructor(private authorUseCases: PostUseCases) {}

  @Get()
  async getAll() {
    return this.authorUseCases.getPosts();
  }
}
