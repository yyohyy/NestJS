import * as bcrypt from 'bcrypt';

export class HashService{
    async hashPassword(password: string){
        return bcrypt.hashSync(password,10)
    }

    async comparePassword(inputPassword: string, hashedPassword: string){
        return bcrypt.compare(inputPassword, hashedPassword)
    }
}