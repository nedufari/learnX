import { IsEmail, IsString } from "class-validator"
import { Roles } from "../Entity/roles.enum"
import { FeedPost } from "../feed/feed.interface"

export class User{
    id?:number
    firstname?:string
    lastname?:string

    @IsEmail()
    email?:string

    @IsString()
    password?:string
    imagePath?:string
    role:Roles
    feedpost?:FeedPost[]   //the entire interface of the feeds to map the post to the user when posted 
}