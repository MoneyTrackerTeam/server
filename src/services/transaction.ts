import { DatabaseProvider } from "../database";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        return await Transaction.list();
    }
    public async createTransaction(title: string, amount: number, date: number, userId: string | number): Promise<Transaction> {
        // do validation
        return Transaction.create(title, amount, date, userId);
    }

    public async getTransactionById(id: number | string) {
        return Transaction.getOne(id);
    }
}

export const transactionService = new TransactionService();
