import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from './user.class';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}
   

    @Post('/register')
    registeruser(@Body()user:User):Observable<User>{
        return this.authservice.signup(user)
    }

    
    @Post('/login')
    login(@Body()user:User):Observable<{token:string}>{
        return this.authservice.login(user).pipe(map((jwt:string)=>({token:jwt})))
    }
}
