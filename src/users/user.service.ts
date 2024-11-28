import { HttpException, HttpStatus,Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../auth/entities/user.entity';
import { UserProfile } from './entities/profile.entity';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly dataSource: DataSource,
  ){}

  async create(createUserDto: CreateUserDto) {
    const {email, password, password2, role, ...userData} = createUserDto
    if (password !== password2){
      throw new HttpException('Invalid request. The password do not match.', HttpStatus.BAD_REQUEST)
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      const user = new User()
      user.email = email
      user.password = password
     // user.role = role
      const authData= await this.authService.register(user); 
      userData['id'] = authData.id ;
      const profile = new UserProfile()
      profile.id = authData.id
      profile.firstName = userData.firstName
      profile.lastName = userData.lastName
      const profileData = await this.userRepository.saveUser(profile);
      // const profileData = await queryRunner.manager.save(profile);
      await queryRunner.commitTransaction()
      console.log("Completed transaction")
      return {...authData, ...profileData}
    }catch(err){
      await queryRunner.rollbackTransaction();
      throw err;
    }finally{
      await queryRunner.release();
    }

  }
  async viewProfile(user: any){
    return await this.userRepository.findById(user.userId)
  }

  async getById(id: string){
    const user = await this.userRepository.findOne({where: {id:id}})
    if (!user){
      throw new NotFoundException(`User with ID: ${id} doesn't exist`)
    }
    return user
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateProfile(id, updateUserDto)
  }
}  
  // findAll() {
  //   return `This action returns all users`;
  // }

  // async findOne(id: string) {
  //   return await this.userRepository.findOne({ where: {id}});
  // }




  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

