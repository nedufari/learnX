import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feeds } from '../Entity/feeds.entity';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  exports:[FeedService],
  imports:[TypeOrmModule.forFeature([Feeds])]
  
})
export class FeedModule {}
