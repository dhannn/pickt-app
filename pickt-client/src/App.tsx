import React from "react";
import { VoteComponent } from "./components/shared/Vote/VoteComponent";
import Avatar from "./components/shared/Avatar/Avatar";
import { getPostById } from "./services/post/PostServices";
import { PostList } from "./components/Post/PostList";

export function App() {
    getPostById('s');

    return (
    <>
        <PostList/>
    </>
    );
}
