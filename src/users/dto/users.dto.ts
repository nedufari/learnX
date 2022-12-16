import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CurrentUserResponseDto {
    @IsUUID()
    id: string;
  
    @IsString()
    @IsEmail()
    email: string;
  }

export class RegisterUserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    department:string

}