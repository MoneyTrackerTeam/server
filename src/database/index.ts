import { Db, MongoClient } from "mongodb";
import { Connection, createConnection } from "typeorm";
import { TransactionEntity } from "../entities/transaction";
import { UserEntity } from "../entities/user";
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
            entities: [UserEntity, TransactionEntity],
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
        try {
            const connection = await MongoClient.connect(this.config.url);
            this.db = await connection.db();
            return this.db;
        } catch (e) {
            console.log(e);
        }
    }
}
