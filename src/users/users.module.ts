import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { HashService } from '../auth/jwt/hash.service';
import { JwtStrategy } from '../auth/jwt/jwt.strategy.service';
import { Files } from '../Entity/files.entity';
import { Lecturers } from '../Entity/lecturer.entity';
import { User } from '../Entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,JwtService,JwtStrategy,HashService],
  imports:[TypeOrmModule.forFeature([User,Lecturers,Files])],
  exports:[UsersService]
})
export class UsersModule {}
