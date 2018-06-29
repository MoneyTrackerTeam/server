import "reflect-metadata";
import { DatabaseProvider } from "./database";
import { ApiServer } from "./server";
const port = +process.env.PORT || 3000;

DatabaseProvider.configure({
    type: "postgres",
    database: "money",
    host: "localhost",
    port: 5432,
    username: "money",
    password: "123",
});

const server = new ApiServer();
server.start(port);
