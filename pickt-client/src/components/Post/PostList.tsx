import React, { CSSProperties, useEffect, useState } from 'react';
import { PostSnippet } from './PostSnippet';
import { getPosts } from '../../services/post/PostServices';
import postStyles from './Post.module.css'
import { Post } from '../../types/Post';

type PostListProps = {
    posts?: Post[],
    style?: CSSProperties
}

export function PostList(props: PostListProps) {
    const [ posts, setPosts ] = useState<Post[]>([]);

    useEffect(() => {
        if (!props.posts)
            fetchPosts();
        else
            setPosts(props.posts);

        async function fetchPosts() {
            const posts = await getPosts();
            setPosts(posts);
        }
    }, []);

    const postComponents = posts.map((post: Post) => {
        if (!post.isDeleted)
            return <PostSnippet key={ post._id } _id={ post._id } content={ post.content } metadata={ post.metadata } voteInfo={ post.voteInfo } comments={ post.comments }/>
    });

    return (
        <div className={postStyles['post-list']} style={props.style}>
            { postComponents }
        </div>
    );
}
