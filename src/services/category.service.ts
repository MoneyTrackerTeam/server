import { DatabaseProvider } from "../database";
import { Category } from "../models/category.model";
import { CategoryForm } from "../forms/category.form";
import { CategoryAlreadyExistsError, CategoryNotFound } from "../common/category.errors";

class CategoryService {
    public async list(): Promise<Category[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        return await repo.find({ relations: ["transactions"] });
    }
    // tslint:disable-next-line:max-line-length
    public async create(form: CategoryForm): Promise<Category> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        const newC = new Category();
        const existingCat = await repo.findOne({ where: { name: form.name } })
        if (existingCat) {
            throw new CategoryAlreadyExistsError()
        }
        newC.name = form.name;
        return await repo.save(newC);
    }

    public async getById(id: number | string): Promise<Category> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        const foundCategory = await repo.findOne(id, { relations: ["transactions"] });
        if (!foundCategory) {
            throw new CategoryNotFound("id", `${id}`);
        }
        return foundCategory
    }

    public async getByName(name: string): Promise<Category> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        const foundCategory = await repo.findOne({ where: name, relations: ["transactions"] });
        if (!foundCategory) {
            throw new CategoryNotFound("name", `${name}`);
        }
        return foundCategory
    }

    public async delete(id: string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Category);
        return await repo.delete(id);
    }
}
export const categoryService = new CategoryService();
