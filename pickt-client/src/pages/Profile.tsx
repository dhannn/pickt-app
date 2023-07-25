import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUser, getUserByUsername } from '../services/user/UserServices';
import { NavBar } from '../components/shared/Layout/NavBar';
import { UserInfoComponent } from '../components/User/UserInfoComponent';
import { PostList } from '../components/Post/PostList';
import { User } from '../types/User';

export function Profile() {
    const { formattedUsername } = useParams();
    const [ user, setUser ] = useState<User>();
    const username = formattedUsername?.slice(1);

    useEffect(() => {
        fetch();

        async function fetch() {
            const user = await getUserByUsername(username!);
            setUser(user);
        }
    }, [])

    if (!user) {
        return;
    }

    const posts = getPostsByUser(username!);
    console.log(user);

    return (
        <>
            <NavBar/>
            <UserInfoComponent name={user.fullName} username={user.username} profilePictureURL={user.profilePictureURI} bio={user.bio!}/>
            <h1 style={{margin: '20vh 0vw -15vh 44vw', fontSize: '2.5rem'}}>{user.fullName.firstName}'s Posts</h1>
            
            {posts?.length === 0 || !posts? <p>Looks like {user.fullName.firstName} doesn't have any posts!</p>: <PostList posts={posts}/>}
        </>
    );
}
