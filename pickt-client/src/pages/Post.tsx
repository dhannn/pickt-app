import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/post/PostServices';
import { PostComponent } from '../components/Post/PostComponent';

export function Post() {
    const { postId } = useParams();
    
    const post = getPostById(postId!)!;
    console.log(postId);
    const { _id, content, metadata, voteInfo, comments } = post;


    return(
    <PostComponent _id={_id} content={content} metadata={metadata} voteInfo={voteInfo} comments={comments}/>);
}