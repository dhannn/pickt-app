import React, { createContext, useState } from "react";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Post } from "./pages/Post";
import { User } from "./types/User";
import { useUserAuth } from "./hooks/useUserAuth";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";

export function App() {
    
    const [ user, setUser ] = useState<User | undefined>(undefined);
    const UserAuthContext = useUserAuth();

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
