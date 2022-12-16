import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from '../users/dto';
import { LecturersService } from './lecturers.service';

@Controller('lecturers')
export class LecturersController {
    constructor(private lecturerservice:LecturersService){}

    @Post('uploadfile')
    @UseInterceptors(FileInterceptor('file'))
    async uploadfile(@UploadedFile()file:Express.Multer.File){
        //return this.lecturerservice.uploadFiles(file.buffer,file.originalname)
    }

    @Post('lect')
    async newLecturer(@Body()dto:RegisterUserDto){
        return await this.lecturerservice.newlecturer(dto)
    }
}
