import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../auth/user.class';
import { Feeds } from '../Entity/feeds.entity';
import { FeedPost } from './feed.interface';
import { FeedsRepository } from './feed.repository';

@Injectable()
export class FeedService {
    constructor (@InjectRepository(Feeds) private feedsrepository:FeedsRepository){

    }

    createFeed( user:User,feeds:FeedPost):Observable<FeedPost>{ //user entity (db) not interface 
        //feeds.author  =user
        feeds.author =user
        return from (this.feedsrepository.save(feeds))
    }
w
    findallfeeds():Observable<FeedPost[]>{
         return from (this.feedsrepository.find())
    }


    updatefeed(id:number,feeds:FeedPost):Observable<UpdateResult>{
        return from (this.feedsrepository.update(id,feeds))
    }

    deletefeed(id:number):Observable<DeleteResult>{
        return from (this.feedsrepository.delete(id))
    }

    
    

   
}
