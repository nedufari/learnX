import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entity/users.entity';
import { LoginDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import { HashService } from './jwt/hash.service';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (@InjectRepository(User)
        private authrepository:AuthRepository, private hashservice:HashService, private configservice:ConfigService,private jwt:JwtService){}

        async Login(logindto:LoginDto){
          const  finduser = await this.authrepository.findOne({where:{email:logindto.email}})
          if (!finduser){
            throw new UnauthorizedException()
          }
          const comaprepassword = await this.hashservice.comparepassword(logindto.password,finduser.password)
          if (!comaprepassword){
            throw new UnauthorizedException()
          }
          return this.signToken(finduser.id, finduser.email)
        
        }

        async signToken(userid:string,email:string):Promise<{access_token}>{
            const payload= {
                sub:userid,
                email
            }
            const secret= await this.configservice.get('SECRETKEY')
            const token =await this.jwt.signAsync(payload,{expiresIn:this.configservice.get('EXPIRESIN'),secret:secret})
            return {access_token:token}
        }
}
