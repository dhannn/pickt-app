import React from 'react';
import { PostList } from '../components/Post/PostList';
import { NavBar } from '../components/shared/Layout/NavBar';

export function Home() {
    return (
        <>
            <NavBar/>
            <PostList/>
        </>
    );
}
