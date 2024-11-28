import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { User } from "../../auth/entities/user.entity";
import { BaseEntity } from "src/common/base.entity";

@Entity()
export class UserProfile extends BaseEntity{
    @Column({type: 'varchar', length: 30})
    firstName: string
    
    @Column({type: 'varchar', length: 30})
    lastName: string

    @Column({nullable: true})
    phoneNo: number;

    @OneToOne(()=>User, (user) => user.profile)
    @JoinColumn({name: 'userId'})
    user: User;
}