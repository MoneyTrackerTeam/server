import { DatabaseProvider } from "../database";
import { TransactionEntity } from "../entities/transaction";
import { User } from "./user";
export class Transaction {
    public id: number;
    public title: string;
    public amount: number;
    public user: User;

    public static async create(title: string, amount: number, userId: number | string): Promise<Transaction> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(TransactionEntity);
        const newEnt = new TransactionEntity();
        newEnt.title = title;
        newEnt.amount = amount;
        const ent = repo.create(newEnt);
        newEnt.user = await User.getEntById(userId);
        const newTrans = await repo.save(newEnt);
        return Transaction.transform(newTrans);
    }

    public static async list(): Promise<Transaction[]> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(TransactionEntity);
        const ents = await repo.find({ relations: ["user"] });
        const trans: Transaction[] = [];
        ents.forEach(e => {
            trans.push(Transaction.transform(e));
        })
        return trans;
    }

    public static transform(t: TransactionEntity): Transaction {
        const trans = new Transaction();
        trans.title = t.title;
        trans.id = t.id;
        trans.amount = t.amount;
        trans.user = User.transform(t.user);
        return trans;
    }
}