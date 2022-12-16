import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy.service';
import { JwtGuard } from './guards/jwtguard';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashService } from './jwt/hash.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { Lecturers } from '../Entity/lecturer.entity';
import { Files } from '../Entity/files.entity';

@Module({
  providers: [AuthService,JwtStrategy,JwtGuard, HashService,UsersService],
  controllers: [AuthController],
  imports:[UsersModule,
    TypeOrmModule.forFeature([User,Lecturers,Files]),
  JwtModule.register({}),

],
exports:[AuthService, HashService]

})
export class AuthModule {}
