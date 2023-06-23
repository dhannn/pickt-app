import React, { createContext, useState } from "react";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Post } from "./pages/Post";
import { User } from "./types/User";
import { useUserAuth } from "./hooks/useUserAuth";
import { Login } from "./pages/Login";

export function App() {
    const myUser: User = {
        _id: "3fcca2",
        name: {
            firstName: "Clarence",
            lastName: undefined
        },
        username: "rncs_21",
        profilePictureURL: "/dp2.png"
    };
    
    const [ user, setUser ] = useState<User | undefined>(undefined);
    const UserAuthContext = useUserAuth();

    return (
        <BrowserRouter>
            <UserAuthContext.Provider value={ { user, setUser } }>
                <Routes>
                    <Route path='/' element={ <Home/> }/>
                    <Route path='/post/:postId' element={ <Post/> }/>
                    <Route path='/user/login' element={ <Login/> } />
                </Routes>
            </UserAuthContext.Provider>
        </BrowserRouter>
    );
}
