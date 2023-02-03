import { User } from "../auth/user.class";


export interface FeedPost{
    id?:number
    post?:string 
    createdAt?:Date
    author?:User;
}