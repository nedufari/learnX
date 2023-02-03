import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GetUser, Role } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import { RolesGuard } from '../auth/guards/roleguard';
import { Roles } from '../Entity/roles.enum';
import { FeedPost } from './feed.interface';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    constructor(private feedservice:FeedService ){}

//adding guards to protect my routes \

    @Role(Roles.ADMIN,Roles.USER)  //from the backend change the user role directly from the database and test the authorization //a decorator
    @UseGuards(JwtGuard, RolesGuard)
    @Post("/post")
    feed(@Body()feeds:FeedPost,@Request()req):Observable<FeedPost>{
        return this.feedservice.createFeed(req.user,feeds)
    }

    @Get("/find/post")
    allfeed(): Observable<FeedPost[]>{
        return this.feedservice.findallfeeds()
    }

    @Put(':id')
    updatefeed(@Param("id")id:number, @Body()feeds:FeedPost):Observable<UpdateResult>{
        return this.feedservice.updatefeed(id,feeds)
    }

    @Delete(':id')
    deletepost(@Param('id')id:number):Observable<DeleteResult>{
        return this.feedservice.deletefeed(id)
    }
}
