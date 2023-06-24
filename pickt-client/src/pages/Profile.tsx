import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostByUser, getUserByUsername } from '../services/user/UserServices';
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

    const posts = getPostByUser(username!);
    console.log(posts);

    return (
        <>
            <NavBar/>
            <UserInfoComponent name={user.name} username={user.username} profilePictureURL={user.profilePictureURL} bio={user.bio!}/>
            <PostList posts={posts}/>
            {/* <div>
                <Avatar size='large' url={user.profilePictureURL}/>
                <h1 style={{color: 'var(--black)'}}>{user.name.firstName} {user.name.lastName === undefined? '': user.name.lastName}</h1>
                <h3 style={{color: 'var(--black)'}}>@{username}</h3>
                {user.bio? <p>{user.bio}</p>: <p><em>No bio here!</em></p>}
            </div> */}

        </>
    );
}
