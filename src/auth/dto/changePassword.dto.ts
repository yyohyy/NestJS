import { IsString, Matches } from "class-validator"
import { passwordRegEx } from "../constants/password.constants"

export class ChangePasswordDto{
    
    @IsString()
    password: string
    
    @IsString()
    @Matches(passwordRegEx)
    newPassword: string

    @IsString()
    newPassword2: string
}