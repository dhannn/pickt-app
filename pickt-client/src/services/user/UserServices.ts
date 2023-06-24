import { User } from '../../types/User';
import object from './../../data/Users.json';

let usersJSON: User[];
usersJSON = object;

export function usernameExists(username: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].username === username) {
            return true;
        }
    }

    return false;
}

export function emailExists(email: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].email === email) {
            return true;
        }
    }

    return false;
}

export function validatePassword(emailUsername: string, password: string) {
    let user = getUserByUsername(emailUsername);
    if (user === null) 
        user = getUserByEmail(emailUsername);
    
    return user?.password === password;
}

export function getUserByEmail(email: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].email === email) {
            return usersJSON[i];
        }
    }

    return null;
}

export function getUserByUsername(username: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].username === username) {
            return usersJSON[i];
        }
    }

    return null;
}

export function getPostByUser(username: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].username === username) {
            return usersJSON[i].posts;
        }
    }

    return undefined;
}
