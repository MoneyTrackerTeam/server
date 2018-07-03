import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Month } from "./month";
import { User } from "./user";
@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public amount: number;

    @Column({
        type: "bigint",
    })
    public date: number;

    @ManyToOne((type) => User, (user) => user.transactions)
    public user: User;

    @ManyToOne(type => Month, month => month.transactions)
    public month: Month;
}
