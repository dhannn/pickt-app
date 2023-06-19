import React from "react";
import { VoteComponent } from "./components/shared/Vote/VoteComponent";
import Avatar from "./components/shared/Avatar/Avatar";

export function App() {
    return (
    <>
        {/* <CreatePostForm isFormFocused={true}></CreatePostForm> */}
        <div style={{alignItems: 'center', display: "flex", flexDirection: 'column'}}>
            <br/>
            <br/>
            <Avatar size='small'/>
            <br/>
            <br/>
            <Avatar size='medium' url='https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
            <br/>
            <br/>
            <Avatar size='large' url='https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        </div>
        <VoteComponent upvotes={10} downvotes={1}/> <br/>
        <VoteComponent upvotes={20} downvotes={3}/>
    </>
    );
}
