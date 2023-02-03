import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { Observable } from "rxjs";

@Injectable()
export class HashService{
    constructor (){}

     comparepassword(pasword:string, hash:string):Observable<Boolean>{
        return bcrypt.compare(pasword,hash)
    }

     hashpasswrod(password:string):Observable<string>{
        return bcrypt.hash(password,10)
    }
}
