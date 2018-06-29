import * as bcrypt from "bcrypt";
import { DatabaseProvider } from "../database";
import { UserEntity } from "../entities/user";
export class User {

    public id?: number;
    public name: string;
    public username: string;
    public password?: string;
    constructor(name: string, username: string, password?: string, id?: number) {
        this.name = name;
        this.username = username;
        this.password = password;
    }

    public passwordMatch(pwd: string): boolean {
        return bcrypt.compareSync(pwd, this.password);
    }
    public static returnModel(user: UserEntity): User {
        return new User(user.name, user.username, user.password, user.id);
    }
    public static returnEntity(user: User): UserEntity {
        const userEnt = new UserEntity();
        userEnt.username = user.username;
        userEnt.name = user.name;
        userEnt.password = this.hashPassword(user.password);
        return userEnt;
    }
    private static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}
