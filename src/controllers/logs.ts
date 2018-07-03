import { Request, Response } from "express";
import { IHttpServer } from "../server/httpServer";
import { logService } from "../services/log";
import { IController } from "./controller";

export class LogsController implements IController {
    public initialize(httpServer: IHttpServer) {
        httpServer.post("/logs", this.addLog.bind(this));
    }
    private async addLog(req: Request, res: Response): Promise<void> {
        const log = await logService.createLog({
            message: req.body.message,
            severity: req.body.severity,
            module: req.body.module,
            userId: +req.user.id,
            error: req.body.error,
        });
        res.send(log);
    }
}
