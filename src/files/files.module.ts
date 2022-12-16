import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from '../Entity/files.entity';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports:[TypeOrmModule.forFeature([Files])],
  exports:[FilesService]
})
export class FilesModule {}
