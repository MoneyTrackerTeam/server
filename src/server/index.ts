import * as bodyParser from "body-parser";
import * as express from "express";
import { CONTROLLERS } from "../controllers";
import { IHttpServer } from "./httpServer";
export class ApiServer implements IHttpServer {
    private app: express.Application;
    public get(url: string, requestHandler: express.RequestHandler): void {
        this.addRoute("get", url, requestHandler);
    }
    public post(url: string, requestHandler: express.RequestHandler): void {
        this.addRoute("post", url, requestHandler);
    }
    public put(url: string, requestHandler: express.RequestHandler): void {
        this.addRoute("put", url, requestHandler);
    }
    public delete(url: string, requestHandler: express.RequestHandler): void {
        this.addRoute("delete", url, requestHandler);
    }

    public start(port: number): void {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        CONTROLLERS.forEach((e) => {
            e.initialize(this);
        });
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    private addRoute(method: "get" | "post" | "put" | "delete", url: string, requestHandler: express.RequestHandler) {
        this.app[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            } catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
        });
        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }
}
