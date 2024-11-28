import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional,IsNotEmpty, IsString, Matches, MinLength} from "class-validator";
import { passwordRegEx } from "src/auth/constants/password.constants";

export enum UserRole {
    Admin = 'admin',
    User = 'user'
  }

export class CreateUserDto {

    @ApiProperty({
      example: 'user@gmail.com',
      required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @Matches(passwordRegEx,{message: "Password must contain minimum 8 characters with atleast one uppercase letter, one lowercase letter, one number and one special character."})
    password: string

    @ApiProperty()
    @IsNotEmpty()
    password2: string

    @IsString()
    @IsOptional()
    @IsEnum(UserRole, { message: "Role must be one of [admin, user]" })
    role: UserRole;

    @ApiProperty({example: "John", required: true})
    @IsString()
    @MinLength(3)
    firstName: string
    
    @ApiProperty({example: "Doe", required: true})
    @IsString()
    @MinLength(3)
    lastName: string

    @ApiProperty({example: "9801234567 [Optional field]", required: false})
    @IsOptional()
    phoneNo: number


}
