import { MongoProvider } from "../database";

interface ILog {
    severity: "danger" | "warning" | "info";
    message: string;
    module: string;
    userId: number;
    error: any;
}

class LogService {
    public async createLog(log: ILog) {
        const db = await MongoProvider.getConnection();
        const collection = db.collection("logs");
        const insertedLog = await collection.insert(log);
        return insertedLog;
    }
}

export const logService = new LogService();
