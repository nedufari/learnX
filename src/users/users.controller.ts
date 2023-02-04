import { Body, Controller, Delete, Get, Param, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors,Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/getuser.decorator';
import { JwtGuard } from '../auth/guards/jwtguard';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of, switchMap } from 'rxjs';
import { saveImageToStorage,isFileExtensionSafe, removeFile } from '../helpers/imagestorage';
import { join } from 'path';
import { UpdateResult } from 'typeorm';


@Controller('users')
export class UsersController {
    constructor(private readonly userservice:UsersService){}


    @UseGuards(JwtGuard)
    @Post('/upload')
    @UseInterceptors(FileInterceptor("file",saveImageToStorage))
    uploadImage(@Request()req, @UploadedFile()file:Express.Multer.File):Observable<UpdateResult |{error:string}>
    {
        const filename = file?.filename
        if (!filename) return of ({error:'file name not png, jpg/jpeg, gif, svg'})

        const ImageFolderPath = join(process.cwd(), 'images')
        const fullimagePath = join(ImageFolderPath +'/'+filename)

        return isFileExtensionSafe(fullimagePath).pipe(
            switchMap((isfilelegit:boolean)=>{
                if (isfilelegit){
                    const userid = req.user.id;
                    return this.userservice.updateuserimagebyid(userid,filename)
                }
                removeFile(fullimagePath)
                return of({error: "file not correct extension type"})
            })
        )


             
        
    }

    @UseGuards(JwtGuard)
    @Get('/image')
    findimage(@Request() req, @Response() res):Observable<Object>{
        const userid = req.user.id
        return this.userservice.findimagenamebyuserid(userid).pipe(switchMap((imagename:string)=>{
            return of(res.sendFile(imagename, { root: './images'}))
        }))

    }
    

   

    
    
}
