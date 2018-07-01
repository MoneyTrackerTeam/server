import { Request, Response } from "express";
import { IHttpServer } from "../server/httpServer";
import { transactionService } from "../services/transaction";
import { IController } from "./controller";

export class TransactionController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.get("/transactions", this.list.bind(this), true);
        httpServer.post("/transactions", this.createTransaction.bind(this));
        httpServer.get("/transaction/:id", this.getOneById.bind(this));
    }
    private async list(req: Request, res: Response): Promise<void> {
        res.status(200).json(await transactionService.list());
    }

    private async createTransaction(req: Request, res: Response): Promise<void> {
        const transaction = await transactionService.createTransaction(req.body.title, +req.body.amount, req.user.id);
        res.status(201).json(transaction);
    }
    private async getOneById(req: Request, res: Response): Promise<void> {
        console.log("asd");
    }
}
