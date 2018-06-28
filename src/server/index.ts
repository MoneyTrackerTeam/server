import { HttpServer } from "./httpServer";
import * as e from 'express';
import * as bodyParser from "body-parser";
import { CONTROLLERS } from "../controllers";
export class ApiServer implements HttpServer {
    private app: e.Application;
    get(url: string, requestHandler: e.RequestHandler): void {
        this.addRoute("get", url, requestHandler);
    }
    post(url: string, requestHandler: e.RequestHandler): void {
        this.addRoute("post", url, requestHandler);
    }
    put(url: string, requestHandler: e.RequestHandler): void {
        this.addRoute("put", url, requestHandler);
    }
    delete(url: string, requestHandler: e.RequestHandler): void {
        this.addRoute("delete", url, requestHandler);
    }
    private addRoute(method: "get" | "post" | "put" | "delete", url: string, requestHandler: e.RequestHandler) {
        this.app[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            } catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
        });
        console.log(`Added route ${method.toUpperCase()} ${url}`)
    }
    public start(port: number): void {
        this.app = e();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        CONTROLLERS.forEach(e => {
            e.initialize(this);
        })
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }
}