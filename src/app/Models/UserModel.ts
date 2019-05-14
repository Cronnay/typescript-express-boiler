import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Token } from './TokenModel';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    username!: string;
    @Column()
    password!: string;
    @OneToMany(type => Token, token => token.user)
    tokens!: Token[];
}