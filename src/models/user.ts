import * as bcrypt from "bcrypt";
import { DatabaseProvider } from "../database";
import { UserEntity } from "../entities/user";
import { Transaction } from "./transaction";

export class User {
    public id: number;
    public name: string;
    public password: string;
    public username: string;
    public transactions: Transaction[];

    public static async create(username: string, name: string, password: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(UserEntity);
        const entity = new UserEntity();
        entity.name = name;
        entity.username = username;
        entity.password = User.hashPassword(password);
        const repoEnt: UserEntity = await repo.save(entity);
        return User.transform(repoEnt);
    }

    public static async getById(userId: number | string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(UserEntity);
        const repoEnt = await repo.findOne(userId);
        return User.transform(repoEnt);
    }
    public static async getEntById(userId: number | string): Promise<UserEntity> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(UserEntity);
        return await repo.findOne(userId);
    }
    public static async getByUsername(username: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(UserEntity);
        const repoEnt = await repo.findOne({ where: { username } });
        return User.transform(repoEnt);
    }

    public static async list(): Promise<User[]> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(UserEntity);
        const ents = await repo.find({ relations: ["transactions"] });
        const users: User[] = [];
        ents.forEach(e => {
            users.push(User.transform(e));
        });
        return users;
    }

    public passwordMatch(pwd: string): boolean {
        return bcrypt.compareSync(pwd, this.password);
    }
    public static hashPassword(password): string {
        return bcrypt.hashSync(password, 10);
    }

    public static transform(u: UserEntity): User {
        const user = new User();
        user.name = u.name;
        user.password = u.password;
        user.username = u.username;
        user.id = u.id;
        return user;
    }
}
