import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "../../Entity/users.entity";
import { UserRepository } from "../../users/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(@InjectRepository(UserEntity)private  userrepository:UserRepository,  configservice:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configservice.get('SECRETKEY')
        })
    }

    //to validate the user 
    // async validate(payload:
    //     {username:string,password:string}){
    //     const user = await this.userrepository.findOne({where:{ email:payload.username,password:payload.password}})
    //     console.log(payload)
    //     if (!user){
    //         throw new UnauthorizedException()
    //     }
    //     return user
    // }

    async validate(payload:any){
        return {...payload.user}
    }
}