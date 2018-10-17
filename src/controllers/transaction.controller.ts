import { Request, Response } from "express";
import { IHttpServer } from "../server/httpServer";
import { transactionService } from "../services/transaction.service";
import { IController } from "./controller";
import { TransactionForm } from "../forms/transaction.form";

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
        const transactionForm: TransactionForm = new TransactionForm(req.body);
        transactionForm.validateTransaction();
        const transaction = await transactionService.createTransaction(transactionForm, req.user.id);
        res.status(201).json(transaction);
    }
    private async getOneById(req: Request, res: Response): Promise<void> {
        const transaction = await transactionService.getTransactionById(req.params.id);
        res.status(200).json(transaction);
    }

    private async update(req: Request, res: Response) {
        const transactionForm = new TransactionForm(req.body);
        const edit = await transactionService.updateTransaction(req.params.id, transactionForm);
        res.json(edit);
    }

    private async delete(req: Request, res: Response): Promise<void> {
        const r = await transactionService.deleteTransaction(req.params.id);
        res.send(r);
    }
}
