import { DatabaseProvider } from "../database";
import { UserEntity } from "../entities/user";
import { User } from "../models/user";

class UserService {
    public async list(): Promise<User[]> {
        const users: User[] = [];
        const connection = await DatabaseProvider.getConnection();
        const userEntities = await connection.getRepository(UserEntity).find();
        userEntities.forEach((e) => {
            const u = new User(e.name, e.username, e.password, e.id);
            users.push(u);
        });
        return users;
    }

    public async findOneById(id: string | number): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const userEntity = await connection.getRepository(UserEntity).findOne(id);
        return new User(userEntity.name, userEntity.username, userEntity.password, userEntity.id, );
    }

    public async findOneByUsername(username: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const userEntity = await connection.getRepository(UserEntity).findOne({ where: { username } });
        return new User(userEntity.name, userEntity.username, userEntity.password, userEntity.id);
    }

    public async createNewUser(username: string, name: string, password: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const user = User.returnEntity(new User(name, username, password));
        const repo = connection.getRepository(UserEntity);
        const userEnt: UserEntity = await repo.save(user);
        return User.returnModel(userEnt);
    }
}

export const userService = new UserService();
