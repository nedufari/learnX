import { Column, Entity, } from "typeorm";
import { SharedEndtity } from "../models/shared.entities";

@Entity()
export class User extends SharedEndtity{
    @Column({nullable:false })
    department:string
    
    




}