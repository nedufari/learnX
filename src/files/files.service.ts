import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from '../Entity/files.entity';
import { FilesRepository } from './file.repository';

@Injectable()
export class FilesService {
    constructor (@InjectRepository(Files)private filerepository:FilesRepository){}

    async uploadFile(filename:string, filebuffer:Buffer){
        const newfile =  await this.filerepository.create({filename, data:filebuffer})
        await this.filerepository.save(newfile)


    }
}
