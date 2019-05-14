import { Router, Request, Response, NextFunction } from 'express';


export default class AppController {
    public router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.index);
    }

    private index(req: Request, res: Response, next: NextFunction): void {
        res.status(200).send('www');
    }
}