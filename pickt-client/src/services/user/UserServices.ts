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

        if (!response.ok)
            return false;

        return await response.json();
    } catch(error) {
        console.error(error);
    }
}

export async function deleteUser(username: string) {
    try {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: 'DELETE',
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
            let user = await response.json();
            let username = user.username;        
            
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 14)
            
            console.log(expiryDate);
            
            document.cookie = `user=${JSON.stringify({username: username})}; expires=${expiryDate.toUTCString()}; path=/`;

            return true
        } else {
            return false
        }

    } catch(err) {
        console.log(err); 
    }
}

export async function logoutUser() {
    try {
        const response = await fetch('http://localhost:3001/users/logout', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        });

        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        return await response.json();
    } catch(err) {
        console.log(err); 
    }
    
}

export async function editUserInfo(modified: any) {
    try {
        const response = await fetch(`http://localhost:3001/users/${modified.username}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(modified)
        });

        if (response.ok) {
            const user = await response.json();

            return user;
        } else {
            return false
        }

    } catch(err) {
        console.log(err); 
    }
}
