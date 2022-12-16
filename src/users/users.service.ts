import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from '../auth/jwt/hash.service';
import { User } from '../Entity/users.entity';
import { CurrentUserResponseDto, RegisterUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userrepository:UserRepository, private hashservice:HashService){

    }

    async checkuserbymail(email: string): Promise<boolean> {
        const user = await this.userrepository.findOne({
          where: { email: email },
          select: ['id', 'email'],
        });
        if (!user) {
          return true;
        } else false;
      }

    
    async registeruser(registeruserdto:RegisterUserDto):Promise<User>{
        
        const existinguser=await this.checkuserbymail(registeruserdto.email)
        if (!existinguser){
            throw new HttpException('message',HttpStatus.NOT_FOUND)
        }
        
        const user = new User();
        user.email=registeruserdto.email;
        user.password= await this.hashservice.hashpasswrod(registeruserdto.password)
        user.department= registeruserdto.department
        console.log(registeruserdto)
        const crateuser = await this.userrepository.save(user)
        return user
        
    }

  

   


  
}
