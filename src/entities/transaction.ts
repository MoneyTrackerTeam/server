import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user";
@Entity()
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public amount: number;

    @ManyToOne((type) => UserEntity, (user) => user.transactions)
    public user: UserEntity;
}
