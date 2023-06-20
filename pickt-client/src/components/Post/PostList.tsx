import React from 'react';
import { PostSnippet } from './PostSnippet';
import { getPosts } from '../../services/post/PostServices';
import postStyles from './Post.module.css'

export function PostList() {
    const posts = getPosts();

    const postComponents = posts.map((post) => {
        return <PostSnippet key={ post._id } _id={ post._id } content={ post.content } metadata={ post.metadata } voteInfo={ post.voteInfo }/>
    });

    return (
        <div className={postStyles['post-list']}>
            { postComponents }
        </div>
    );
}
