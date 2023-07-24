import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/post/PostServices';
import { PostComponent } from '../components/Post/PostComponent';
import { NavBar } from '../components/shared/Layout/NavBar';

export function Post() {
    const { postId } = useParams();
    const [ post, setPost ] = useState();

    useEffect(() => {
        fetchPost();

        async function fetchPost() {
            const post = await getPostById(postId!);
            setPost(post);
        }
    });

    if (!post) {
        return(
            <>
                <NavBar/>
                <h1>Oh snap! This post does not exist!</h1>
            </>
        );
    }
    
    const { _id, content, metadata, voteInfo, comments } = post!;

    return(
        <>
            <NavBar/>
            <PostComponent _id={_id} content={content} metadata={metadata} voteInfo={voteInfo} comments={comments}/>
        </>
    );
}