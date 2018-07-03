import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user";
@Entity("transactions")
export class TransactionEntity {
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

    @ManyToOne((type) => UserEntity, (user) => user.transactions)
    public user: UserEntity;
}
