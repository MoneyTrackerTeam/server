import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../models/user";
@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public amount: number;

    @ManyToOne(type => User, user => user.transactions)
    public user: User;
}
