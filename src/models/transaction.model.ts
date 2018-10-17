import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.model";
import { Month } from "./month.model";
import { User } from "./user.model";
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
    @Column({ nullable: true })
    public note: string;

    @ManyToOne((type) => User, (user) => user.transactions)
    public user: User;

    @ManyToOne(type => Month, month => month.transactions)
    public month: Month;

    @ManyToOne(type => Category, category => category.transactions)
    public category: Category;
}
