import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionEntity } from "./transaction";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()

    public name: string;
    @Column()

    public password: string;
    @Column()
    public username: string;

    @OneToMany(type => TransactionEntity, transactions => transactions.user)
    public transactions: TransactionEntity[];
}
