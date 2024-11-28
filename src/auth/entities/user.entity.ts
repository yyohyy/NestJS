import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, Unique} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { UserProfile } from '../../users/entities/profile.entity';
import * as bcrypt from 'bcrypt';

export enum Role {
    Admin = 'admin',
    User = 'user'
  }

@Entity()
@Unique(['email'])
export class User extends BaseEntity{

    @Column({type: 'varchar', length: 50, unique: true})
    email: string

    @Column({ type: 'varchar'})
    password: string

    @Column({type: 'enum', enum: Role, default: Role.User})
    role: Role;

    @OneToOne(()=> UserProfile, (profile) =>profile.user)
    @JoinColumn()
    profile: UserProfile

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
  
}
