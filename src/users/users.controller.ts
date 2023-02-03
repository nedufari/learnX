import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/getuser.decorator';
import { JwtGuard } from '../auth/guards/jwtguard';
import { UsersService } from './users.service';
import { Request } from 'express';


@Controller('users')
export class UsersController {
    constructor(private readonly userservice:UsersService){

    }

    

   

    
    
}
