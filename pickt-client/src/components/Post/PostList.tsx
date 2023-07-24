import React, { useEffect, useState } from 'react';
import { PostSnippet } from './PostSnippet';
import { getPosts } from '../../services/post/PostServices';
import postStyles from './Post.module.css'
import { Post } from '../../types/Post';

type PostListProps = {
    posts?: Post[]
}

export function PostList(props: PostListProps) {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        fetchPosts();

        async function fetchPosts() {
            const posts = await getPosts();
            setPosts(posts);
        }
    }, []);

    const postComponents = posts.map((post: Post) => {
        return <PostSnippet key={ post._id } _id={ post._id } content={ post.content } metadata={ post.metadata } voteInfo={ post.voteInfo }/>
    });

    return (
        <div className={postStyles['post-list']}>
            { postComponents }
        </div>
    );
}
