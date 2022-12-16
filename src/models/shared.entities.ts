import { BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


//entityies  ost like;y to appear in various tables 
export abstract class SharedEndtity {
    @PrimaryGeneratedColumn("uuid")
    id :string

    @Column({type:"timestamp with time zone",default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date


    @Column({type:"varchar", unique:true,nullable:false})
    email:string

    @Column({nullable:false})
    password:string
   

}

