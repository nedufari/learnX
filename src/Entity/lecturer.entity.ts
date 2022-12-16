import { Column, Entity, JoinColumn, OneToOne, } from "typeorm";
import { SharedEndtity } from "../models/shared.entities";
import { Files } from "./files.entity";

@Entity()
export class Lecturers extends SharedEndtity{
    @Column()
    course:string

    @Column()
    coursecode:string

    @JoinColumn({name:'docsId'})
    @OneToOne(()=>Files,{nullable:true})
    public docs:Files

    @Column({nullable:true})
    public docsId?:number


    

}