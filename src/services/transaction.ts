import { DatabaseProvider } from "../database";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";

class TransactionService {
    public async list(): Promise<Transaction[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Transaction).find();
    }
    public async createTransaction(title: string, amount: number, userId: string | number): Promise<Transaction> {
        const connection = await DatabaseProvider.getConnection();
        const userRepo = connection.getRepository(User);
        const transRepo = connection.getRepository(Transaction);
        const user = await userRepo.findOne(userId);
        const newTransaction = transRepo.create({ title, amount });
        newTransaction.user = user;
        return await transRepo.save(newTransaction);

    }
}

export const transactionService = new TransactionService();
