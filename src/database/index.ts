import { Connection, createConnection } from "typeorm";
import { Customer } from "../models/customer";

export interface DatabaseConfiguration {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
}

export class DatabaseProvider {
    private static connection: Connection;
    private static config: DatabaseConfiguration;

    public static configure(config: DatabaseConfiguration) {
        DatabaseProvider.config = config;
    }

    public static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection
        }
        const { host, type, port, username, password, database } = DatabaseProvider.config;
        DatabaseProvider.connection = await createConnection({
            type,
            host,
            port,
            username,
            password,
            database,
            entities: [Customer],
            synchronize: true
        });
        return DatabaseProvider.connection;
    }
}
