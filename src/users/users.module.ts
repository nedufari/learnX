import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt/jwt.strategy.service';
import { Feeds } from '../Entity/feeds.entity';
import { UserEntity } from '../Entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,JwtService,JwtStrategy],
  imports:[TypeOrmModule.forFeature([UserEntity,Feeds])],
  exports:[UsersService]
})
export class UsersModule {}
