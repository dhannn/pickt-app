import React, { createContext, useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Post } from "./pages/Post";
import { User } from "./types/User";
import { getUserAuthContext } from "./hooks/useUserAuth";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { getUserByUsername } from "./services/user/UserServices";

export function App() {
    const [ user, setUser ] = useState<User | undefined>(undefined);
    
    useEffect(() => {
        console.log(document.cookie);
        
        const userCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user='));
        if (userCookie) {
            
            const user = JSON.parse(userCookie.split('=')[1]);
            fetch(user.username).then((user) => {
                setUser(user)
            }
            );
        }

        async function fetch(username: string) {
            return await getUserByUsername(username);
        } 
    }, []);    

    const UserAuthContext = getUserAuthContext();

    return (
        <BrowserRouter>
            <UserAuthContext.Provider value={ { user, setUser } }>
                <Routes>
                    <Route path='/' element={ <Home/> }/>
                    <Route path='/post/:postId' element={ <Post/> }/>
                    <Route path='/user/login' element={ <Login/> } />
                    <Route path='/user/new' element={ <Register/> } />
                    <Route path='/user/:formattedUsername' element={ <Profile/> } />
                </Routes>
            </UserAuthContext.Provider>
        </BrowserRouter>
    );
}
