import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from '../auth/jwt/hash.service';
import { Lecturers } from '../Entity/lecturer.entity';
import { FilesService } from '../files/files.service';
import { RegisterUserDto } from '../users/dto';
import { UsersController } from '../users/users.controller';
import { LecturerRepository } from './lecturer.repository';

@Injectable()
export class LecturersService {
    constructor(@InjectRepository(Lecturers) private lecturerrepository:LecturerRepository, private fileservice:FilesService, private hashservice:HashService){

    }

    async uploadFiles(filename:string, filebuffer:Buffer){
        const docs= await this.fileservice.uploadFile(filename, filebuffer)
        await this.lecturerrepository.update;
        return docs
    }

    async newlecturer(newlect:RegisterUserDto){
        const user = new Lecturers();
        user.email= newlect.email
        user.password= await this.hashservice.hashpasswrod(newlect.password)
        const reg=await this.lecturerrepository.save(user)
        return user 

    }
    
}
