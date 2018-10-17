import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { Month } from "../models/month.model";
import { IHttpServer } from "../server/httpServer";
import { monthService } from "../services/month.service";
import { IController } from "./controller.controller";

export class MonthController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.get("/months", this.list.bind(this));
        httpServer.get("/months/:id", this.getOneById.bind(this));
    }
    private async list(req: Request, res: Response): Promise<void> {
        const opts: FindManyOptions<Month> = {};
        if (req.query.month && req.query.year) {
            opts.where = {
                monthNumber: req.query.month,
                year: req.query.year,
            };
            res.status(200).json(await monthService.list(opts));
            return;
        }
        if (req.query.month) {
            opts.where = {
                monthNumber: req.query.month,
            };
            res.status(200).json(await monthService.list(opts));
            return;
        }
        if (req.query.month) {
            opts.where = {
                year: req.query.year,
            };
            res.status(200).json(await monthService.list(opts));
            return;
        }
        res.status(200).json(await monthService.list());

    }
    private async getOneById(req: Request, res: Response): Promise<void> {
        res.status(200).json(await monthService.getById(req.params.id));
    }
}
