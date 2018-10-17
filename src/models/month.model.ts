import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.model";

@Entity("months")
export class Month {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public budget: number;

    @Column({
        default: 0,
    })
    public spent: number;

    @Column()
    public monthNumber: number;

    @Column()
    public year: number;

    @OneToMany(type => Transaction, transaction => transaction.month)
    public transactions: Transaction[];
}
