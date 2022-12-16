import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/getuser.decorator';
import { JwtGuard } from '../auth/guards/jwtguard';
import { User } from '../Entity/users.entity';
import { RegisterUserDto } from './dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userservice:UsersService){

    }

    @UseGuards(JwtGuard)
    @Get('me')
     me (@GetUser()user:User){
        console.log(user)
        return  user

    }

    @Post('register')
    async RegisterUser(@Body()registerdto:RegisterUserDto){
        return await this.userservice.registeruser(registerdto)
    }
}
