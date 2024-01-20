import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { SocialMediaServicesModule } from '../../services/social-media/social-media.module';

import { PostUseCases } from './post.use-case';
import { PostFactoryService } from './post-factory.service';

@Module({
  imports: [DataServicesModule, SocialMediaServicesModule],
  providers: [PostUseCases, PostFactoryService],
  exports: [PostUseCases, PostFactoryService],
})
export class PostUseCasesModule {}
