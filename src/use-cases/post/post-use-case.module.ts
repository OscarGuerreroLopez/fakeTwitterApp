import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { PostUseCases } from './post.use-case';
import { PostFactoryService } from './post-factory.service';
import { CreatePostService } from './createPost.service';
import { CreateTweetPostService } from './createTweetPost.service';
import { AnomalyService } from './anomaly.service';

import { SocialMediaServicesModule } from '../../services/social-media/social-media.module';

@Module({
  imports: [DataServicesModule, SocialMediaServicesModule],
  providers: [
    PostUseCases,
    PostFactoryService,
    CreatePostService,
    CreateTweetPostService,
    AnomalyService,
    SocialMediaServicesModule,
  ],
  exports: [PostUseCases, PostFactoryService],
})
export class PostUseCasesModule {}
