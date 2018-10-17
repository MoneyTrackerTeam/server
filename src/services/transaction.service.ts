import Defaults from "../config";
import { DatabaseProvider } from "../database";
import { Category } from "../models/category.model";
import { Month } from "../models/month.model";
import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";
import { categoryService } from "./category.service";
import { monthService } from "./month.service";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.find({ relations: ["user", "month", "category"] });
    }
    // tslint:disable-next-line:max-line-length
    public async createTransaction(title: string,
        amount: number,
        date: number,
        userId: string | number,
        catId: number,
        note: string): Promise<Transaction> {
        const transRepo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        const userRepo = (await DatabaseProvider.getConnection()).getRepository(User);
        const transaction = new Transaction();
        transaction.title = title;
        transaction.amount = amount;
        transaction.date = date;
        transaction.note = note;
        const transEnt = await transRepo.create(transaction);
        const user = await userRepo.findOne(userId);
        transEnt.user = user;
        transEnt.month = await this.getMonth(date, amount);
        await monthService.incrementMonth(transEnt.month, amount);
        transEnt.category = await this.getCategory(catId);
        return await transRepo.save(transEnt);
    }

    public async getTransactionById(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.findOne(id, { relations: ["user", "month", "category"] });
    }

    public async updateTransaction(id: string, title: string, amount: number, date: number, catId: string, note: string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        let tr = await repo.findOne(id, { relations: ["user", "month", "month.transactions", "category"] });
        if (amount) {
            tr.amount = amount;
        }
        if (title) {
            tr.title = title;
        }
        if (date) {
            tr.date = date;
            const month = tr.month;
            tr.month = await this.getMonth(date, +amount);
            tr = await repo.save(tr);
            await monthService.decrementMonth(month.id, amount);
            await monthService.incrementMonth(tr.month, amount);
        }
        if (catId) {
            tr.category.id = (await this.getCategory(catId)).id;
        }
        if (note) {
            tr.note = note;
        }
        return await repo.save(tr);
    }

    public async deleteTransaction(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.delete(id);
    }
    private async getMonth(dateN: number, amount: number): Promise<Month> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        const date = new Date(+dateN);
        const month = await repo.findOne({
            where: {
                monthNumber: date.getMonth(),
                year: date.getFullYear(),
            },
        });
        if (month) {
            return month;
        } else {
            return await monthService.createMonth(Defaults.defaultBudget, date.getMonth(), date.getFullYear());
        }
    }

    private async getCategory(id: number | string): Promise<Category> {
        const cat = await categoryService.getById(id);
        if (!cat) {
            throw new Error("Category was not found. Please create one");
        }
        return cat;
    }
}

export const transactionService = new TransactionService();
