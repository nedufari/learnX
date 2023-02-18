import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FeedModule } from './feed/feed.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../core/allexceptionfilter';

@Module({
  imports: [
    UsersModule, 
     AuthModule, 
     TypeOrmModule.forRootAsync({useClass:TypeormService}),
    ConfigModule.forRoot({isGlobal:true}),
  MulterModule.register({dest:'./uploads'}),
  FeedModule]
  ,
    providers:[
      TypeormService, {provide: APP_FILTER, useClass:AllExceptionsFilter}
      
      ]
     
})
export class AppModule {}
