import Defaults from "../config";
import { DatabaseProvider } from "../database";
import { Category } from "../models/category.model";
import { Month } from "../models/month.model";
import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";
import { categoryService } from "./category.service";
import { monthService } from "./month.service";
import { TransactionForm } from "../forms/transaction.form";
import { CategoryNotFound } from "../common/category.errors";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.find({ relations: ["user", "month", "category"] });
    }
    public async createTransaction(form: TransactionForm, userId): Promise<Transaction> {
        const transRepo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        const userRepo = (await DatabaseProvider.getConnection()).getRepository(User);
        const transaction = new Transaction();
        transaction.title = form.title;
        transaction.amount = form.amount;
        transaction.date = form.date;
        transaction.note = form.note;
        const transEnt = await transRepo.create(transaction);
        const user = await userRepo.findOne(userId);
        transEnt.user = user;
        transEnt.month = await this.getMonth(form.date);
        await monthService.incrementMonth(transEnt.month, form.amount);
        transEnt.category = await this.getCategory(form.categoryId);
        return await transRepo.save(transEnt);
    }

    public async getTransactionById(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.findOne(id, { relations: ["user", "month", "category"] });
    }

    public async updateTransaction(id: string, form: TransactionForm) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        let tr = await repo.findOne(id, { relations: ["user", "month", "month.transactions", "category"] });
        if (form.amount) {
            tr.amount = form.amount;
        }
        if (form.title) {
            tr.title = form.title;
        }
        if (form.date) {
            tr.date = form.date;
            const month = tr.month;
            tr.month = await this.getMonth(form.date);
            tr = await repo.save(tr);
            await monthService.decrementMonth(month.id, form.amount);
            await monthService.incrementMonth(tr.month, form.amount);
        }
        if (form.categoryId) {
            tr.category.id = (await this.getCategory(form.categoryId)).id;
        }
        if (form.note) {
            tr.note = form.note;
        }
        return await repo.save(tr);
    }

    public async deleteTransaction(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.delete(id);
    }
    private async getMonth(dateN: number): Promise<Month> {
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
            throw new CategoryNotFound("id", `${id}`)
        }
        return cat;
    }
}

export const transactionService = new TransactionService();
