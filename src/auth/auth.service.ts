import { BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/loginResponse.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { AuthRepository } from './auth.repository';
import { UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class AuthService {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ){}

    async register(authData: Partial<User>){
        return this.authRepository.saveAuth(authData)
    }

    async validateUser(loginDto: LoginDto): Promise<any>{
        console.log("Inside User Validation.")
        const user = await this.authRepository.findByEmail(loginDto.email);
        console.log(loginDto)
        if (!user){
            throw new BadRequestException(`Cannot find user with email: ${loginDto.email}`)
        }
        const passwordMatch = await bcrypt.compare(loginDto.password, user.password)
        if (!passwordMatch){
            throw new BadRequestException('Invalid password. Provide correct credentials')
        }   
        return user
    }

    async logIn(email: string, password: string): Promise<LoginResponseDto>{
        const userData = await this.authRepository.findByEmail(email)
        if (!userData){
            throw new BadRequestException(`No user found with email: ${email}`)
        }
        const passwordMatch = await bcrypt.compare(password, userData.password)
        if (!passwordMatch){
            throw new BadRequestException('Invalid password. Provide correct credentials')
        }
        const payload = { id: userData.id, role: userData.role}
        console.log(payload)
        const token = await this.jwtService.signAsync(payload)
        const decoded = this.jwtService.verify(token);
        console.log('Decoded Token:', decoded);
        return {accessToken: token}
    }

    async changePassword(id: string, params: ChangePasswordDto){
        const user = await this.authRepository.findOne({where: {id}});
        const passwordMatch =await bcrypt.compare(params.password, user.password);
        if (!user || !passwordMatch){
            throw new UnauthorizedException("Not authorized to change password.")
        }
        const password = await bcrypt.hash(params.password,10)
        await this.authRepository.changePassword(user.id,password)
    }  
    
    async findById(id: string){
        return await this.authRepository.findOne({where: {id}})
    }
}
