import { Module } from '@nestjs/common';
import { TweetServicesModule } from '../../infra/social-media/twitter/tweeter.module';
import { FacebookServicesModule } from '../../infra/social-media/facebook/facebook.module';

@Module({
  imports: [TweetServicesModule, FacebookServicesModule],
  exports: [TweetServicesModule, FacebookServicesModule],
})
export class SocialMediaServicesModule {}
