import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { IHttpServer } from "../server/httpServer";
import { userService } from "../services/user.service";
import { IController } from "./controller.controller";
import { UserForm } from "../forms/user.form";

export class AuthController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.post("/login", this.login.bind(this), true);

    }
    private async login(req: Request, res: Response): Promise<void> {
        const userForm = new UserForm(req.body);
        userForm.validateExistingUserForLogin();
        const user: User = await userService.findOneByUsername(req.body.username);
        if (userService.passwordMatch(req.body.password, user.password)) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, "secret");
            res.json({
                accessToken: token,
            });
        } else {
            console.log("bad stuff");
        }
    }
}
