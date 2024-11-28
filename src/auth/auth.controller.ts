import { Body, Controller, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { BadRequestException } from '@nestjs/common';
import { JwtGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}
      
    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return await this.authService.logIn(loginDto.email, loginDto.password)
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Patch('change-password')
    async changePassword(@Req() req: any, @Body() params: ChangePasswordDto){
        const id: string  = req.user.id
        if (params.newPassword !== params.newPassword2){
            throw new BadRequestException("The new password don't match.")
        }
        return await this.authService.changePassword(id, params)
    }
    
    @ApiBearerAuth()
    @Post('test')
    @UseGuards(JwtGuard)
    test(@Req() req:any){
        console.log(req.user)
    }
    // @Post('/decode')
    // async decodeToken(@Headers('authorization') authHeader: string) {
    //      const token = authHeader?.split(' ')[1];
    //     if (!token) {
    //     throw new UnauthorizedException('No token provided');
    //  }
    //     const payload = this.jwtService.verify(token, { secret: jwtConstants.secret, ignoreExpiration: false });
    //     console.log('Decoded Token:', payload);
    //     return payload;
    //     }
 
    // @Post('refresh')
    // async refresh(@Body()){
    //     return await this.authService.refresh()
    // }
}
