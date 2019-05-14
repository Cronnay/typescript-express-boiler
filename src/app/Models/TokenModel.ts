import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from 'typeorm';
import { User } from './UserModel';

@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    token!: string;
    @ManyToOne(type => User, user => user.tokens)
    user!: User
}