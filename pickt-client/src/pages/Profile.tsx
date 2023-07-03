import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUser, getUserByUsername } from '../services/user/UserServices';
import Avatar from '../components/shared/Avatar/Avatar';
import { NavBar } from '../components/shared/Layout/NavBar';
import { UserInfoComponent } from '../components/User/UserInfoComponent';
import { PostList } from '../components/Post/PostList';

export function Profile() {
    const { formattedUsername } = useParams();
    const username = formattedUsername?.slice(1);

    const user = getUserByUsername(username!);

    if (user === null) {
        return;
    }

    const posts = getPostsByUser(username!);
    console.log(posts);

    return (
        <>
            <NavBar/>
            <UserInfoComponent name={user.fullName} username={user.username} profilePictureURL={user.profilePictureURL} bio={user.bio!}/>
            <h1 style={{margin: '20vh 0vw -15vh 44vw', fontSize: '2.5rem'}}>{user.fullName.firstName}'s Posts</h1>
            
            {posts?.length === 0 || !posts? <p>Looks like {user.fullName.firstName} doesn't have any posts!</p>: <PostList posts={posts}/>}
        </>
    );
}
