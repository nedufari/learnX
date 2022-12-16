import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService{
    constructor (){}

    async comparepassword(pasword:string, hash:string):Promise<Boolean>{
        return bcrypt.compare(pasword,hash)
    }

    async hashpasswrod(password:string):Promise<string>{
        return bcrypt.hash(password,10)
    }
}
