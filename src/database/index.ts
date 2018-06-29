import { Connection, createConnection } from "typeorm";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";

export interface IDatabaseConfiguration {
    type: "postgres";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
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
            entities: [User, Transaction],
            synchronize: true,
        });
        return DatabaseProvider.connection;
    }
    private static connection: Connection;
    private static config: IDatabaseConfiguration;

}
