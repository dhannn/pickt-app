import { Request, Response } from "express";
import { deleteUser, findUserByUsername, findUsers, insertUser, updateUser } from "../models/UserDB";
import * as fs from 'fs';

export async function createUser(req: Request, res: Response) {
    const data = parseBody(req.body);
    const user = await insertUser(data);
    
    res.status(200).json(user);
    
    function parseBody(body: any) {
        return {
            fullName: {
                firstName: body['first-name'],
                lastName: body['last-name'],
            },
            username: body['username'],
            email: body['email'],
            password: body['password'],
            bio: body['bio'],
            profilePictureURI: body['profile-picture']
        }
    }

    function saveImageToFile(base64: string) {
        fs.writeFileSync('user.jpg', base64);
    }
}

export async function getUsers(req: Request, res: Response) {
    const users = await findUsers();
    res.status(200).json(users);
}

export async function getUserByUsername(req: Request, res: Response) {
    const user = await findUserByUsername(req.params.username);
    res.status(200).json(user);
}

export async function editUserInfo(req: Request, res: Response) {
    const body = req.body;
    const data = {
        username: req.params.username,
        newUsername: body['username'],
        fullName: {
            firstName: body['first-name'],
            lastName: body['last-name']
        }, 
        email: body['email'],
        password: body['password'],
        bio: body['bio'],
        profilePictureURI: body['profile-picture']
    }

    const user = await updateUser(data);

    res.status(200).json(user);
}

export async function deactivateUser(req: Request, res: Response) {
    const user = deleteUser(req.params.username);
    res.status(200).json(user);
}
