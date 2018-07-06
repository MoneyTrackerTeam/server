import * as bcrypt from "bcrypt";
import { FindOneOptions } from "typeorm";
import { DatabaseProvider } from "../database";
import { User } from "../models/user";

class UserService {
    public async list(): Promise<User[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(User);
        const users = await repo.find({ relations: ["transactions"] });
        return users;
    }

    public async findOneById(id: string | number): Promise<User> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(User);
        const opts: FindOneOptions<User> = {
            select: ["id", "password", "name", "username"],
        };
        return await repo.findOne(id, opts);
    }

    public async findOneByUsername(username: string): Promise<User> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(User);
        const opts: FindOneOptions<User> = {
            where: {
                username,
            },
            select: ["id", "password", "name", "username"],
        };
        return await repo.findOne(opts);
    }

    public async createNewUser(username: string, name: string, password: string): Promise<User> {
        const user = new User();
        user.name = name;
        user.username = username;
        user.password = this.hashPassword(password);
        const repo = (await DatabaseProvider.getConnection()).getRepository(User);
        return await repo.save(user);
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
    public passwordMatch(candidate: string, hash: string): boolean {
        return bcrypt.compareSync(candidate, hash);
    }
}

export const userService = new UserService();
