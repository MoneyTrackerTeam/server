import { Db, MongoClient } from "mongodb";
import { Connection, createConnection } from "typeorm";
import { Category } from "../models/category.model";
import { Month } from "../models/month.model";
import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";
export interface IDatabaseConfiguration {
    type: "postgres";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
}
export interface IMongoConfig {
    url: string;
}
export class DatabaseProvider {
    public static configure(config: IDatabaseConfiguration) {
        DatabaseProvider.config = config;
    }
    public static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }
        const { host, type, port, username, password, database } = DatabaseProvider.config;
        DatabaseProvider.connection = await createConnection({
            type,
            host,
            port,
            username,
            password,
            database,
            entities: [User, Transaction, Month, Category],
            synchronize: true,
        });
        return DatabaseProvider.connection;
    }
    private static connection: Connection;
    private static config: IDatabaseConfiguration;

}

export class MongoProvider {
    private static config: IMongoConfig;
    private static db: Db;
    public static configure(config: IMongoConfig) {
        MongoProvider.config = config;
    }

    public static async getConnection() {
        if (MongoProvider.db) {
            return MongoProvider.db;
        }
        const connection = await MongoClient.connect(this.config.url);
        this.db = await connection.db();
        return this.db;
    }
}
