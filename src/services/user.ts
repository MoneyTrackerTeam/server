import { DatabaseProvider } from "../database";
import { User } from "../models/user";

class UserService {
    public async list(): Promise<User[]> {
        const users: User[] = [];
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).find();
    }

    public async findOneById(id: string | number): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).findOne(id);
    }

    public async findOneByUsername(username: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).findOne({ where: { username } });
    }

    public async createNewUser(username: string, name: string, password: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(User);
        const newUser = new User();
        newUser.name = name;
        newUser.password = password;
        newUser.username = username;
        newUser.hashPassword();
        return await repo.save(newUser);
    }
}

export const userService = new UserService();
