import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        unique: true,
    })
    public name: string;

    @OneToMany(type => Transaction, transaction => transaction.category)
    public transactions: Transaction[];
}
