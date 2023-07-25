import { Request, Response } from "express";
import { deleteUser, findUserByUsername, findUsers, insertUser, updateUser } from "../models/UserDB";
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';

export async function login(req: any, res: Response) {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.user = user;
        return res.status(200).json(user);
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


export async function logout(req:Request, res: Response) {      
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
    });

    return res.status(200).json({ message: 'Logout successful' });
}

export async function createUser(req: Request, res: Response) {
    const data = req.body;

    try {
        const user = await insertUser(data);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function getUsers(req: Request, res: Response) {
    const users = await findUsers(req.params.email);
    res.status(200).json(users);
}

export async function getUserByUsername(req: Request, res: Response) {
    const user = await findUserByUsername(req.params.username);
    res.status(200).json(user);
}

export async function editUserInfo(req: Request, res: Response) {
    const body = req.body;
    console.log(body);
    
    const user = await updateUser(body);

    res.status(200).json(user);
}

export async function deactivateUser(req: Request, res: Response) {
    const user = deleteUser(req.params.username);
    res.status(200).json(user);
}
