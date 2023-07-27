import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPostById } from '../services/post/PostServices';
import { PostComponent } from '../components/Post/PostComponent';
import { NavBar } from '../components/shared/Layout/NavBar';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLoading } from '../hooks/useLoading';

export function Post() {
    const { postId } = useParams();
    const [ post, setPost ] = useState();
    const { isLoading, setLoading, loadingIcon } = useLoading();

    useEffect(() => {
        fetchPost();
        async function fetchPost() {
            const post = await getPostById(postId!);
            setPost(post);
            setLoading(false);
        }
    });

    if (isLoading) {
        return loadingIcon;
    }

    
    if (!post) {
        return(
            <>
                <NavBar/>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '20vh'}}>
                    <h1 style={{textAlign: 'center', color: 'var(--black)', fontSize: '2.5rem'}}>Oh snap! This post does not exist.</h1>
                    <FontAwesomeIcon style={{fontSize: '15rem', color: 'var(--lavender)', marginTop: '5vh'}} icon={faBolt} />
                    <Link style={{textAlign: 'center', marginTop: '5vh'}} to='/'>Go Home</Link>
                </div>
            </>
        );
    }
    
    const { _id, content, metadata, voteInfo, comments, isDeleted } = post!;

    return(
        <>
            <NavBar/>
            <PostComponent _id={_id} content={content} metadata={metadata} voteInfo={voteInfo} comments={comments} isDeleted={isDeleted}/>
        </>
    );
}