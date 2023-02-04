import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Feeds } from "./feeds.entity";
import { Roles } from "./roles.enum";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"timestamp with time zone",default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date


    @Column({type:"varchar", unique:true,nullable:false})
    email:string

    @Column({select:false})
    password:string

    
    @Column({nullable:true})
    imagePath:string


    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column({type:'enum', enum:Roles, default:Roles.USER})
    role:Roles

    @OneToMany(()=>Feeds,(feeds)=>feeds.author) //the class of the db and the entity of the class feeds for the Feeds table 
    feedpost:Feeds[] //mapping to all the many posts the user can post

    
    




}