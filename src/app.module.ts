import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FeedModule } from './feed/feed.module';

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
      TypeormService,
      
      ]
     
})
export class AppModule {}
