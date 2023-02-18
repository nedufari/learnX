import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy.service';
import { JwtGuard } from './guards/jwtguard';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { Feeds } from '../Entity/feeds.entity';
import { RolesGuard } from './guards/roleguard';


@Module({
  providers: [AuthService,JwtStrategy,JwtGuard,UsersService,RolesGuard],
  controllers: [AuthController],
  imports:[UsersModule,
  TypeOrmModule.forFeature([UserEntity,Feeds]),
  JwtModule.registerAsync({
    useFactory:()=>({
      secret:process.env.SECRETKEY,
      signOptions:{expiresIn:'3600s'}
    })
  }),

],
exports:[AuthService,]

})
export class AuthModule {}
