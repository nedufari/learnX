import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}
    @Post('login')
    async Login(@Body()dto:LoginDto){
        return await this.authservice.Login(dto)
    }
}
