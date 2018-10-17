import { Request, Response } from "express";
import { IHttpServer } from "../server/httpServer";
import { userService } from "../services/user.service";
import { IController } from "./controller.controller";

export class UserController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.get("/users", this.list.bind(this));
        httpServer.post("/users", this.createNewUser.bind(this), true);

    }
    private async list(req: Request, res: Response): Promise<void> {
        res.send(await userService.list());
    }

    private async createNewUser(req: Request, res: Response): Promise<void> {
        const newUser = await userService.createNewUser(req.body.username, req.body.name, req.body.password);
        res.status(200).json(newUser);
    }
}
