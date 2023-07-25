import React, { useContext, useState } from 'react';
import { PostList } from '../components/Post/PostList';
import { NavBar } from '../components/shared/Layout/NavBar';
import { CreatePostForm } from '../components/Forms';
import { getUserAuthContext } from '../hooks/useUserAuth';
import { LoginSignup } from '../components/shared/Button/LoginSignup';
import { AddPicture } from '../components/Forms/AddPicture';
import { HighlightComponent } from '../components/shared/FormElements/HighlightComponent';

export function Home() {
    const [ isFocused, setFocus ] = useState(false);
    const UserAuthContext = getUserAuthContext();
    const context = useContext(UserAuthContext);

    return (
        <>
            {<HighlightComponent photo={'https://images.unsplash.com/photo-1519895609939-d2a6491c1196?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop'} description={'Daniel (@dhannn) does an incredibly well-crafted portrait'} isActive={isFocused}/>}
            <NavBar/>
            { context?.user !== undefined? <CreatePostForm isFormFocused={ isFocused } setFocused={ setFocus }/> : renderLogInSignUp()}
            <PostList />
        </>
    );

    function renderLogInSignUp() {
        return (
            <LoginSignup message='to create a post.' style={{width: '45vw', position: 'relative', left: '44vw', top: '12vh'}}/>
        );
    }
}
