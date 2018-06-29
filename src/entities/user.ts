import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()

    public name: string;
    @Column()

    public password: string;
    @Column()
    public username: string;
}
