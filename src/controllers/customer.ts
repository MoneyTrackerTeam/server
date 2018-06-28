import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { Request, Response } from "express";
import { customerService } from "../services/customer";

export class CustomerController implements Controller {
    public initialize(httpServer: HttpServer) {
        httpServer.get('/customers', this.list.bind(this));
        httpServer.get('/customers/:id', this.getById.bind(this));
        httpServer.post('/customers', this.create.bind(this));
        httpServer.put('/customers/:id', this.update.bind(this));
        httpServer.delete('/customers/:id', this.remove.bind(this));

    }
    private async list(req: Request, res: Response): Promise<void> {
        res.send(await customerService.list());
    }
    private async getById(req: Request, res: Response): Promise<void> {
        const customer = await customerService.getById(req.params.id);
        res.status(200).json(customer);
    }
    private async create(req: Request, res: Response): Promise<void> {
        const customer = await customerService.create(req.body);
        res.status(201).json(customer);
    }
    private async update(req: Request, res: Response): Promise<void> {
        const customer = customerService.update(req.body);
        res.send(customer);
    }
    private async remove(req: Request, res: Response): Promise<void> {
        const result = customerService.delete(req.body.id);
        res.send(result);
    }
}