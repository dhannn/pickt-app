import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { findUserByUsername } from '../models/UserDB';

export async function hashPassword(req: Request, res: Response, next: NextFunction) {
    const SALT_ROUNDS = 10;
    const hashed = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    
    req.body.password = hashed;
    next();
}

export async function doesUsernameExist(req: Request, res: Response, next: NextFunction) {
    const username = req.params.username;
    const user = await findUserByUsername(username);
    
    if (!user) {
        return res.status(404).json({ message: "Cannot find username." });       
    }

    next();
}
