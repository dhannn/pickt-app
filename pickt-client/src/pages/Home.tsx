import React, { useContext, useState } from 'react';
import { PostList } from '../components/Post/PostList';
import { NavBar } from '../components/shared/Layout/NavBar';
import { CreatePostForm } from '../components/Forms';
import { useUserAuth } from '../hooks/useUserAuth';
import { LoginSignup } from '../components/shared/Button/LoginSignup';

export function Home() {
    const [ isFocused, setFocus ] = useState(false);
    const UserAuthContext = useUserAuth();
    const context = useContext(UserAuthContext);

    console.log(context?.user);

    return (
        <>
            <NavBar/>
           { context?.user !== undefined? <CreatePostForm isFormFocused={ isFocused } setFocused={ setFocus }/> : renderLogInSignUp()}
            <PostList/>
        </>
    );

    function renderLogInSignUp() {
        return (
            <LoginSignup message='to post a comment' style={{width: '45vw', position: 'relative', left: '44vw', top: '12vh'}}/>
        );
    }
}
