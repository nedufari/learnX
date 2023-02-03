import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { UserEntity } from '../Entity/users.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userrepository:UserRepository){

    }


   
    
   
  




  
}
