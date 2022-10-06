import express, { Express } from "express";
import {ErrorsInterceptor} from "../src/middlewares/errors.interceptor";

export function testServer(configure: (express: Express) => void): Express {
    const app = express();
    app.use(express.json());
    configure(app);
    app.use(ErrorsInterceptor);
    return app;
}