import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm'
import { Files } from '../Entity/files.entity';
import { Lecturers } from '../Entity/lecturer.entity';
import { User } from '../Entity/users.entity';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory{
    constructor(private configservice:ConfigService){}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return{
            type:"postgres",
            host:this.configservice.get('DATABASE_HOST'),
            port:this.configservice.get('DATABASE_PORT'),
            username:this.configservice.get('DATABASE_USERNAME'),
            password:this.configservice.get('DATABASE_PASSWORD'),
            database:this.configservice.get('DATABASE_NAME'),
            entities: [User,Lecturers,Files],
            synchronize:true,
            logging:false,
            migrations:[],
        
            subscribers:[]
           
        }
        
    }
}




