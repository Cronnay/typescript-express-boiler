import { Router, Request, Response, NextFunction } from 'express';
import { CreateUser } from './../Validator/CreateUser';

export default class AppController {
    public router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.index);
        this.router.post('/user', CreateUser, this.createUser)
    }

    private index(req: Request, res: Response): void {
        res.status(200).send("Hello");
    }

    private createUser(req: Request, res: Response) {
        res.sendStatus(200);
    }
}