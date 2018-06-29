import { RequestHandler } from "express";

export interface IHttpServer {
    get(url: string, requestHandler: RequestHandler, pub?: boolean): void;
    post(url: string, requestHandler: RequestHandler, pub?: boolean): void;
    put(url: string, requestHandler: RequestHandler, pub?: boolean): void;
    delete(url: string, requestHandler: RequestHandler, pub?: boolean): void;
}
