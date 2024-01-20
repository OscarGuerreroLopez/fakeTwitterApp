import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataServices } from '../../../core';

import { Post, PostSchema } from './model';
import { MongoDataServices } from './mongo-data-service.service';
import { rootMongooseTestModule } from './inMemory-connection';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    rootMongooseTestModule(),
  ],
  providers: [
    {
      provide: DataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [DataServices],
})
export class MongoDataServicesModule {}
