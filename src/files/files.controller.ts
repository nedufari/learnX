import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {

@Post('upload')
@UseInterceptors(FileInterceptor('file',{storage:diskStorage({
    destination: './uploads', filename:(req, file, callback)=>{
        const uniquesuffix= Date.now() * Math.round(Math.random());
        const ext = extname(file.originalname);
        const filename= `${file.originalname}${uniquesuffix}${ext}`;
        callback(null, filename)
    }
})}))
uploadFile(@UploadedFile()file:Express.Multer.File){
    console.log(file)
}

}
