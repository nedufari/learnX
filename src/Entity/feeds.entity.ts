import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";

@Entity()
export class Feeds{

    @PrimaryGeneratedColumn()
    id :number

    @Column({length:300})
    post:string 

    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date
    
    @Column({type:"timestamp",default:()=>'CURRENT_TIMESTAMP'})
    UpdatedAt:Date 

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.feedpost) //as applied to the user table
    author:UserEntity //mapping to the owner of the post or the user who posted it
    
}
