import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../infra/data-services/mongo/mongo-data-service.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
