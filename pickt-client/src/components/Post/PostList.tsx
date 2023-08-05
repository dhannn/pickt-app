import React, { CSSProperties, useEffect, useState } from 'react';
import { PostSnippet } from './PostSnippet';
import { getPosts } from '../../services/post/PostServices';
import postStyles from './Post.module.css'
import { Post } from '../../types/Post';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLoading } from '../../hooks/useLoading';

type PostListProps = {
    posts?: Post[],
    style?: CSSProperties
}

export function PostList(props: PostListProps) {
    const [ posts, setPosts ] = useState<Post[]>([]);

    const { isLoading, setLoading, loadingIcon } = useLoading();

    useEffect(() => {
        if (!props.posts)
            fetchPosts();
        else {
            setPosts(props.posts);
            setLoading(false);
        }

        async function fetchPosts() {
            const posts = await getPosts();
            setPosts(posts);
            setLoading(false);
        }
    }, []);

    if (isLoading) {
        return loadingIcon;
    }

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
