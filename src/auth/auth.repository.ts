import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class AuthRepository extends Repository<User>{
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
      }

    async saveAuth(authData: Partial<User>){
        return this.save(authData)
    }

    async findByEmail(email: string){
        return this.findOne({where: {email}})
    }

    async changePassword(id: string, newPassword: string){
        const user = await this.findOne({where: {id}})
        if (!user){
            return null
        }
        user.password = newPassword;
        return await this.save(user)
    }
}