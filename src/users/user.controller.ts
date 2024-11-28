import { Controller, Get, Post, Body, Patch, Param, Req, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('register')
  @ApiBody({ type: CreateUserDto, description: "Enter details to create an account."})
  async create(@Body() createUserDto: CreateUserDto) {
    const userData = await this.userService.create(createUserDto);
    const data = plainToInstance(UserResponseDto,userData)
    return data
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)  
  @Get('profile')
  async viewProfile(@Req() req: any){
      console.log("Inside View Profile")
      return await this.userService.viewProfile(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('edit-profile')
  async update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.id, updateUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }



  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
