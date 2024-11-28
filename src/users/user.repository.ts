import { Repository } from "typeorm";
import { UserProfile } from "./entities/profile.entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserRepository extends Repository<UserProfile>{
    
    constructor(private readonly dataSource: DataSource) {
        super(UserProfile, dataSource.createEntityManager());
    }

    async findById(id: string){
        return await this.findOne({where:{id}})
    }

    async saveUser(userData: any) {
        return this.save(userData);
      }

    async updateProfile(id:string, updateUserDto: UpdateUserDto){
        const user = await this.findOne({where:{id}})
        if (!user){
            return null
        }
        user.firstName = updateUserDto.firstName
        user.lastName = updateUserDto.lastName
        user.phoneNo = updateUserDto.phoneNo
        return await this.save(user)
    }
}