import Defaults from "../config";
import { DatabaseProvider } from "../database";
import { Month } from "../models/month";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";
import { monthService } from "./month";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.find({ relations: ["user", "month"] });
    }
    // tslint:disable-next-line:max-line-length
    public async createTransaction(title: string, amount: number, date: number, userId: string | number): Promise<Transaction> {
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
}

export const transactionService = new TransactionService();
