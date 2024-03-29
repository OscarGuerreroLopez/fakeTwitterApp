import { Module } from '@nestjs/common';
import { PostUseCasesModule } from './use-cases/post/post-use-case.module';
import { SocialMediaServicesModule } from './services/social-media/social-media.module';
import { DataServicesModule } from './services/data-services/data-services.module';
import { PostController } from './controllers/post.controller';

@Module({
  imports: [PostUseCasesModule, SocialMediaServicesModule, DataServicesModule],
  controllers: [PostController],
  providers: [],
})
export class AppModule {}
