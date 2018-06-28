import 'reflect-metadata';
import { ApiServer } from './server';
import { DatabaseProvider } from './database';
const port = +process.env.PORT || 3000;

DatabaseProvider.configure({
    type: "postgres",
    database: "filmer",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: "123"
})

const server = new ApiServer;
server.start(port);