import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Transaction } from "./transaction";

@Entity("transactions")
export class Month {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public budget: number;

    @Column()
    public spent: number;

    @OneToMany(type => Transaction, transaction => transaction.month)
    public transactions: Transaction[];
}
