import React from "react";
import { VoteComponent } from "./components/shared/Vote/VoteComponent";
import Avatar from "./components/shared/Avatar/Avatar";
import { getPostById } from "./services/post/PostServices";
import { PostList } from "./components/Post/PostList";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Post } from "./pages/Post";

export function App() {
    getPostById('s');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/post/:postId' element={<Post/>}/>
            </Routes>
        </BrowserRouter>
    );
}
