import { DatabaseProvider } from "../database";
import { User } from "../models/user";

class UserService {
    public async list(): Promise<User[]> {
        return await User.list();
    }

    public async findOneById(id: string | number): Promise<User> {
        return await User.getById(id);
    }

    public async findOneByUsername(username: string): Promise<User> {
        return await User.getByUsername(username);
    }

    public async createNewUser(username: string, name: string, password: string): Promise<User> {
        return await User.create(username, name, password);
    }
}

export const userService = new UserService();
