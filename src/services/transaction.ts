import Defaults from "../config";
import { DatabaseProvider } from "../database";
import { Category } from "../models/category";
import { Month } from "../models/month";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";
import { categoryService } from "./category";
import { monthService } from "./month";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.find({ relations: ["user", "month"] });
    }
    // tslint:disable-next-line:max-line-length
    public async createTransaction(title: string, amount: number, date: number, userId: string | number, catId: number): Promise<Transaction> {
        const transRepo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        const userRepo = (await DatabaseProvider.getConnection()).getRepository(User);
        const transaction = new Transaction();
        transaction.title = title;
        transaction.amount = amount;
        transaction.date = date;
        const transEnt = await transRepo.create(transaction);
        const user = await userRepo.findOne(userId);
        transEnt.user = user;
        transEnt.month = await this.getMonth(date, amount);
        transEnt.category = await this.getCategory(catId);
        return await transRepo.save(transEnt);
    }

    public async getTransactionById(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.findOne(id, { relations: ["user", "month"] });
    }
    public async deleteTransaction(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.delete(id);
    }
    private async getMonth(dateN: number, amount: number): Promise<Month> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        const date = new Date(+dateN);
        let month = await repo.findOne({
            where: {
                monthNumber: date.getMonth(),
                year: date.getFullYear(),
            },
        });
        if (month) {
            return await monthService.incrementMonth(month.id, amount);
        } else {
            month = await monthService.createMonth(Defaults.defaultBudget, date.getMonth(), date.getFullYear());
            return await monthService.incrementMonth(month.id, amount);
        }
    }

    private async getCategory(id: number): Promise<Category> {
        const cat = await categoryService.getById(id);
        if (!cat) {
            throw new Error("Category was not found. Please create one");
        }
        return cat;
    }
}

export const transactionService = new TransactionService();
