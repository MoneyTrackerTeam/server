import { DatabaseProvider } from "../database";
import { Category } from "../models/category.model";

class CategoryService {
    public async list(): Promise<Category[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        return await repo.find({ relations: ["transactions"] });
    }
    // tslint:disable-next-line:max-line-length
    public async create(name: string): Promise<Category> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        const newC = new Category();
        newC.name = name;
        return await repo.save(newC);
    }

    public async getById(id: number | string): Promise<Category> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        return await repo.findOneOrFail(id, { relations: ["transactions"] });
    }

    public async getByName(name: string): Promise<Category> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        return await repo.findOne({ where: name, relations: ["transactions"] });
    }

    public async delete(id: string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        return await repo.delete(id);
    }
}
export const categoryService = new CategoryService();
