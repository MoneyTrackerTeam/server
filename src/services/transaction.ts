import { DatabaseProvider } from "../database";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.find({ relations: ["user"] });
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
        return await transRepo.save(transEnt);
    }

    public async getTransactionById(id: number | string) {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Transaction);
        return await repo.findOne(id);
    }
}

export const transactionService = new TransactionService();
