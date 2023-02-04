import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, NotFoundError, Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { User } from '../auth/user.class';
import { UserEntity } from '../Entity/users.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userrepository:UserRepository){

    }

//this would carry all the functions of the user 

findUserById(id: number): Observable<User> {
    return from(
        this.userrepository.findOne({ where: { id }, relations: ['feedPosts'] }),
      ).pipe(
        map((user: User) => {
          if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }
          delete user.password;
          return user;
        }),
      );
  } 


  //update because the image is not needed at first and you could always use that later 

  updateuserimagebyid(id:number, imagePath:string):Observable<UpdateResult>{
    const user:User = new UserEntity
    user.id =id 
    user.imagePath=imagePath
    return from (this. userrepository.update(id,user))
  }

  findimagenamebyuserid(id:number):Observable<string>{
    return from (this.userrepository.findOne({where:{id}})).pipe(map((user:User)=>{
        delete user.password
        return user.imagePath
    }))
  }


    
   
  




  
}
