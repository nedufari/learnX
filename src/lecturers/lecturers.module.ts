import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../auth/jwt/hash.service';
import { Lecturers } from '../Entity/lecturer.entity';
import { FilesModule } from '../files/files.module';
import { LecturersController } from './lecturers.controller';
import { LecturersService } from './lecturers.service';

@Module({
  controllers: [LecturersController],
  providers: [LecturersService,HashService],
  imports:[FilesModule,TypeOrmModule.forFeature([Lecturers])],
  exports:[LecturersService]
})
export class LecturersModule {}
