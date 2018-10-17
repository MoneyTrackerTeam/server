import * as bcrypt from "bcrypt";
import { FindOneOptions } from "typeorm";
import { DatabaseProvider } from "../database";
import { User } from "../models/user.model";
import { UserForm } from "../forms/user.form";
import { UserExistsError, UserNotFoundError } from "../common/user.errors";

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
        // return await repo.findOne(id, opts);
        const foundUser = await repo.findOne(id, opts);
        if (!foundUser) {
            throw new UserNotFoundError("id", `${id}`);
        }
        return foundUser;
    }

    public async findOneByUsername(username: string): Promise<User> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(User);
        const opts: FindOneOptions<User> = {
            where: {
                username,
            },
            select: ["id", "password", "name", "username"],
        };
        const foundUser = await repo.findOne(opts);
        if (!foundUser) {
            throw new UserNotFoundError("id", username);
        }
        return foundUser;
    }

    public async createNewUser(userForm: UserForm): Promise<User> {
        const user = new User();
        user.name = userForm.name
        user.username = userForm.username
        user.password = this.hashPassword(userForm.password);

        //check if user exists in db
        const userExists = !!((await DatabaseProvider.getConnection()).getRepository(User)).findOne({ where: { username: userForm.username } })
        if (userExists) {
            throw new UserExistsError();
        }
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
