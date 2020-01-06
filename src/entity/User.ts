import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated} from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    @Generated("uuid")
    hash: string;

    @Column()
    is_active: boolean;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

}
