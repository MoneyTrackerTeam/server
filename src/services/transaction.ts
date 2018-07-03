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
        transEnt.month = await this.getMonth(date);
        return await transRepo.save(transEnt);
    }

    public async getTransactionById(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.findOne(id, { relations: ["user", "month"] });
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
}

export const transactionService = new TransactionService();
