import * as bcrypt from "bcrypt";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    public id?: number;
    @Column()

    public name: string;
    @Column()

    public password: string;
    @Column()
    public username: string;

    @OneToMany(type => Transaction, transactions => transactions.user)
    public transactions?: Transaction[];

    public passwordMatch?(pwd: string): boolean {
        return bcrypt.compareSync(pwd, this.password);
    }
    public hashPassword?(): void {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
