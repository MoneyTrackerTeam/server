import { Request, Response } from "express";
import { IHttpServer } from "../server/httpServer";
import { categoryService } from "../services/category";
import { IController } from "./controller";

export class CategoriesController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.get("/categories", this.list.bind(this));
        httpServer.get("/categories/:id", this.getOneById.bind(this));
        httpServer.post("/categories", this.create.bind(this));
        httpServer.delete("/categories/:id", this.delete.bind(this));
    }
    private async list(req: Request, res: Response): Promise<void> {
        res.status(200).json(await categoryService.list());
    }

    private async create(req: Request, res: Response): Promise<void> {
        const c = await categoryService.create(req.body.name);
        res.status(201).json(c);
    }
    private async getOneById(req: Request, res: Response): Promise<void> {
        res.status(200).json(await categoryService.getById(req.params.id));
    }

    private async delete(req: Request, res: Response): Promise<void> {
        res.status(204).json(await categoryService.delete(req.params.id));
    }
}
