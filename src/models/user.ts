import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()

    public name: string;
    @Column({ select: false })

    public password: string;
    @Column()
    public username: string;

    @OneToMany(type => Transaction, transactions => transactions.user)
    public transactions: Transaction[];
}
