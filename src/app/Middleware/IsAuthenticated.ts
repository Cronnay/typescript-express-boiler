import { Request, Response, NextFunction } from 'express';
import { IResponse } from './../Interfaces/IResponse';
import TokenHandler from '../Auth/Tokenhandler'
import { Token } from './../Models/TokenModel';
import Hashing from './../Helpers/Crypting';

export async function IsAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        res.sendStatus(401);
    }

    // Get the token, hash it and compare 
    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ') : [''];
    if (!headerToken[1]) {
        res.sendStatus(401);
    }
    const hashedToken = await Hashing.hash(headerToken[1]);
    const backendToken = await Token.findOne({ token: hashedToken });
    if(!backendToken) {
        res.sendStatus(401);
    }
}