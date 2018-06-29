import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user";
import { IHttpServer } from "../server/httpServer";
import { userService } from "../services/user";
import { IController } from "./controller";

export class AuthController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.post("/login", this.login.bind(this));

    }
    private async login(req: Request, res: Response): Promise<void> {
        const user: User = await userService.findOneByUsername(req.body.username);
        if (user.passwordMatch(req.body.password)) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, "secret");
            res.json({
                accessToken: token,
            });
        } else {
            res.status(401).json({
                msg: "Invalid credentials",
            });
        }
    }
}