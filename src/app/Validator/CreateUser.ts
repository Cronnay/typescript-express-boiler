import { Request, Response, NextFunction } from 'express';
import { ICreateUser } from '../Interfaces/ICreateUser';

export function CreateUser(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.body);
        const user: ICreateUser = req.body;
        if (!user) {
            res.sendStatus(401);
        }
        next();
    } catch (validationError) {
        res.status(400).send(validationError);
    }
}