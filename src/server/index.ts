import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import passport from "../authentication/passport";
import { CONTROLLERS } from "../controllers";
import { IHttpServer } from "./httpServer";
export class ApiServer implements IHttpServer {
    private app: express.Application;
    public get(url: string, requestHandler: express.RequestHandler, pub?: boolean): void {
        this.addRoute("get", url, requestHandler, pub);
    }
    public post(url: string, requestHandler: express.RequestHandler, pub?: boolean): void {
        this.addRoute("post", url, requestHandler, pub);
    }
    public put(url: string, requestHandler: express.RequestHandler, pub?: boolean): void {
        this.addRoute("put", url, requestHandler, pub);
    }
    public delete(url: string, requestHandler: express.RequestHandler, pub?: boolean): void {
        this.addRoute("delete", url, requestHandler, pub);
    }

    public start(port: number): void {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(passport.initialize());
        CONTROLLERS.forEach((e) => {
            e.initialize(this);
        });
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    private addRoute(method: "get" | "post" | "put" | "delete", url: string,
        requestHandler: express.RequestHandler, pub: boolean) {
        if (pub) {
            this.app[method](url, async (req, res, next) => {
                try {
                    await requestHandler(req, res, next);
                } catch (e) {
                    res.status(500).json(e);
                }
            });
        } else {
            this.app[method](url, passport.authenticate("jwt", { session: false }), async (req, res, next) => {
                try {
                    await requestHandler(req, res, next);
                } catch (e) {
                    res.status(500).json(e);
                }
            });
        }

        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }
}
