import { User } from '../../types/User';
import object from './../../data/Users.json';

let usersJSON: User[];
usersJSON = [];

export async function addUser(user: User) {
    try {
        const response = await fetch(`http://localhost:3001/users/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(user)
        });
    
        return response;
    } catch(error) {
        console.error(error);
    }

}

export async function usernameExists(username: string) {
    try {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
    
        return response.ok;
    } catch(error) {
        console.error(error);
    }
}

export function emailExists(email: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].email === email) {
            return true;
        }
    }

    return false;
}

export async function validatePassword(emailUsername: string, password: string) {
    let user = await getUserByUsername(emailUsername);
    if (user === null) 
        user = getUserByEmail(emailUsername);
    
    return user?.password === password;
}

export async function getUserByEmail(email: string) {
    try {
        const response = await fetch(`http://localhost:3001/users?email=${email}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
    
        return await response.json();
    } catch(error) {
        console.error(error);
    }
}

export async function getUserByUsername(username: string) {
    try {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
    
        return await response.json();
    } catch(error) {
        console.error(error);
    }
}

export function getPostsByUser(username: string) {
    for (let i in usersJSON) {
        if (usersJSON[i].username === username) {
            return usersJSON[i].posts;
        }
    }

    return undefined;
}

export async function loginUser(username: string, password: string) {
    try {
        const response = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const user = await response.json();
            document.cookie = `user=${JSON.stringify(user)}`;

            return true
        } else {
            return false
        }

    } catch(err) {
        console.log(err); 
    }
}
