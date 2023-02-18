import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/users.entity';
import { LoginDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.class';
import { from, map, Observable, switchMap,of, tap } from 'rxjs';
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


  doesuserexist(email:string):Observable<boolean>{
    return from (this.authrepository.findOne({where:{email}})).pipe(switchMap((user:User)=>{
      return  of(!!user)
    }))
  }


  signup(user: User): Observable<User> {

    const { firstname, lastname, email, password } = user

    return this.doesuserexist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
      }),

      switchMap(() =>{

        return this.hashpassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(this.authrepository.save({ firstname, lastname, email, password: hashedPassword })).pipe(map((user: User) => {
              delete user.password //those wont return back the password to the user
              return user
            }))
    
          }))

      }))
    
  
    }

//code to validate the user and compare the login details ie the emailand the password
  validateUser(email:string, password:string):Observable<User>{
    return from (this.authrepository.findOne({where:{email}, select:['id','firstname','lastname','email','password','role']})).pipe(
      switchMap((user:User)=>{
        if (!user){
          //throw new HttpException('Not found', HttpStatus.NOT_FOUND)
          throw new HttpException({status:  HttpStatus.NOT_FOUND,error:"invalid credentials "}, HttpStatus.NOT_FOUND)
        }
        return from (bcrypt.compare(password,user.password)).pipe(map((isValidPassword:boolean)=>{
          if (isValidPassword){
            delete user.password
            return user
          }
        }))
      })
    )
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
