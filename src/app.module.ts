import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LecturersModule } from './lecturers/lecturers.module';
import { AuthModule } from './auth/auth.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule, 
    LecturersModule,
     AuthModule, 
     TypeOrmModule.forRootAsync({useClass:TypeormService}),
    ConfigModule.forRoot({isGlobal:true}),
    FilesModule,
  MulterModule.register({dest:'./uploads'})]
  ,
    providers:[
      TypeormService,
      
      ]
     
})
export class AppModule {}
