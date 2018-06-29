import { IHttpServer } from "../server/httpServer";
export interface IController {
    initialize(httpServer: IHttpServer): void;
}
