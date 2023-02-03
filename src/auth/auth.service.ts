import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/users.entity';
import { LoginDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.class';
import { from, map, Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity)
  private authrepository: AuthRepository, private configservice: ConfigService, private jwt: JwtService) { }

  comparepassword(pasword: string, hash: string): Observable<Boolean> {
    return bcrypt.compare(pasword, hash)
  }

  hashpassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10)).pipe(
      map(hashedPassword => hashedPassword as string)
    );
  }


  signup(userinterace: User): Observable<User> {
    const { firstname, lastname, email, password } = userinterace
    return this.hashpassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(this.authrepository.save({ firstname, lastname, email, password: hashedPassword })).pipe(map((user: User) => {
          delete user.password //thos wont return back the password to the user
          return user
        }))

      }))
  }

//code to validate the user and compare the login details ie the emailand the password
  validateUser(email: string, password: string): Observable<User> {
    return from(this.authrepository.findOne({
      where: { email },
      select: ['id', 'firstname', 'lastname', 'email', 'password', 'role']
    })).pipe(switchMap((user: User) =>
      from(bcrypt.compare(password, user.password)).pipe(map((isValidPassword: boolean) => {
        if (isValidPassword) {
          delete user.password;
          return user
        }
      }
      ))

    ))



  }

  //login function for the 
  login(user: User): Observable<string> {
    const {email, password} = user

    return this.validateUser(email,password).pipe(switchMap((user:User)=>{
      if (user){
        //create jwt token for the login 
        return from (this.jwt.signAsync({user}))
      }
    }))
  }
    











  // async Login(logindto:LoginDto){
  //   const  finduser = await this.authrepository.findOne({where:{email:logindto.email}})
  //   if (!finduser){
  //     throw new UnauthorizedException()
  //   }
  //   const comaprepassword = await this.hashservice.comparepassword(logindto.password,finduser.password)
  //   if (!comaprepassword){
  //     throw new UnauthorizedException()
  //   }
  //   return this.signToken(finduser.id, finduser.email)

  // }

  // async signToken(userid:string,email:string):Promise<{access_token}>{
  //     const payload= {
  //         sub:userid,
  //         email
  //     }
  //     const secret= await this.configservice.get('SECRETKEY')
  //     const token =await this.jwt.signAsync(payload,{expiresIn:this.configservice.get('EXPIRESIN'),secret:secret})
  //     return {access_token:token}
  // }
}
