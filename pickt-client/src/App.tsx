import React from "react";
import { CreatePostForm } from "./components/Forms";
import { Vote } from "./components/shared/Button/Vote";

export function App() {
    return (
    <>
        {/* <CreatePostForm isFormFocused={true}></CreatePostForm> */}
        <Vote upvotes={10} downvotes={1}/> <br/>
        <Vote upvotes={20} downvotes={3}/>
    </>
    );
}
