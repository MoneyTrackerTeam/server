import { Request, Response } from "express";
import { IHttpServer } from "../server/httpServer";
import { transactionService } from "../services/transaction";
import { IController } from "./controller";

export class TransactionController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.get("/transactions", this.list.bind(this));
        httpServer.post("/transactions", this.createTransaction.bind(this));
        httpServer.get("/transactions/:id", this.getOneById.bind(this));
        httpServer.put("/transactions/:id", this.update.bind(this));
        httpServer.delete("/transactions/:id", this.delete.bind(this));
    }
    private async list(req: Request, res: Response): Promise<void> {
        res.status(200).json(await transactionService.list());
    }

    private async createTransaction(req: Request, res: Response): Promise<void> {
        const transaction = await transactionService.
            createTransaction(req.body.title,
                +req.body.amount,
                req.body.date,
                req.user.id,
                +req.body.categoryId,
                req.body.note);
        res.status(201).json(transaction);
    }
    private async getOneById(req: Request, res: Response): Promise<void> {
        const transaction = await transactionService.getTransactionById(req.params.id);
        res.status(200).json(transaction);
    }

    private async update(req: Request, res: Response) {
        const { title, amount, categoryId, date } = req.body;
        const edit = await transactionService.updateTransaction(req.params.id, title, +amount, date, categoryId);
        res.json(edit);
    }

    private async delete(req: Request, res: Response): Promise<void> {
        const r = await transactionService.deleteTransaction(req.params.id);
        res.send(r);
    }
}
