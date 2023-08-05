import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserByUsername } from '../services/user/UserServices';
import { NavBar } from '../components/shared/Layout/NavBar';
import { UserInfoComponent } from '../components/User/UserInfoComponent';
import { PostList } from '../components/Post/PostList';
import { User } from '../types/User';
import { useUserAuth } from '../hooks/useUserAuth';
import { CreatePostForm } from '../components/Forms';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPostsByUser } from '../services/post/PostServices';
import { Post } from '../types/Post';
import { useLoading } from '../hooks/useLoading';

export function Profile() {
    const { formattedUsername } = useParams();
    const [ user, setUser ] = useState<User>();
    const [ posts, setPosts ] = useState<Post[]>();
    const username = formattedUsername?.slice(1);
    const userAuth = useUserAuth()!;
    const { isLoading, setLoading, loadingIcon } = useLoading();

    useEffect(() => {
        fetch();
        async function fetch() {
            const user = await getUserByUsername(username!);
            if (!user) {
                setLoading(false);
                setUser(undefined);
                return;
            }
            
            setUser(user);
            
            const postResponse = await getPostsByUser(username!);
            
            setPosts(postResponse);
            setLoading(false);
            console.log(postResponse);
            console.log(postResponse + ':' + isLoading);
        }
    }, []);

    if (isLoading) {
        return loadingIcon;
    }

    if (!user) {
        return <>
            <NavBar/>
            
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20vh'}}>
                    <h1 style={{textAlign: 'center', color: 'var(--black)', fontSize: '2.5rem'}}>Oh snap! This user does not exist.</h1>
                    <p style={{textAlign: 'center', marginTop: '1vh'}}>They might also just deleted their account 🤷</p>
                    <FontAwesomeIcon style={{fontSize: '15rem', color: 'var(--lavender)', marginTop: '5vh'}} icon={faBolt} />
                    <Link style={{textAlign: 'center', marginTop: '5vh'}} to='/'>Go Home</Link>
            </div>
        </>;
    }

    const emptyPosts = userAuth.user !== undefined && user.username === userAuth.user.username?
        <>
        <p style={{ position: 'absolute', top: '26vh', left: '44vw'}}>Looks like you don't have any posts! <Link to={'/'}>Create one now.</Link></p>
        </>
        :
        <p style={{ position: 'absolute', top: '26vh', left: '44vw'}}>Looks like {user.fullName.firstName} doesn't have any posts!</p>;

    return (
        <>
            <NavBar/>
            <UserInfoComponent name={user.fullName} username={user.username} profilePictureURL={user.profilePictureURI} bio={user.bio!}/>
            <h1 style={{margin: '20vh 0vw -15vh 44vw', fontSize: '2.5rem'}}>{user.fullName.firstName}'s Posts</h1>
            
            {posts?.length === 0 || !posts? emptyPosts: <PostList posts={posts}/>}
        </>
    );
}
