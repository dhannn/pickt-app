import React, { useState } from 'react';
import { PostList } from '../components/Post/PostList';
import { NavBar } from '../components/shared/Layout/NavBar';
import { CreatePostForm } from '../components/Forms';

export function Home() {
    const [ isFocused, setFocus ] = useState(false);

    return (
        <>
            <NavBar/>
            <CreatePostForm isFormFocused={ isFocused } setFocused={setFocus}/>
            <PostList/>
        </>
    );
}
