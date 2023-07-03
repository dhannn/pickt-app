import { Post } from '../../types/Post';
import { User } from '../../types/User';
import object from './../../data/Posts.json';

let postsJSON: Post[];
postsJSON = object;

export function getPosts() {
    return postsJSON;
}

export function getPostById(id: string) {
    for (let i in postsJSON) {
        if (postsJSON[i]._id === id) {
            return postsJSON[i];
        }
    }

    return null;
}

export function getCommentById(postId: string, commentId: string) {
    const post = getPostById(postId);
    
    if (post?.comments === undefined) return null;

    for (let i in post?.comments) {
        const comments = post?.comments[i];

        if (comments && commentId[i] === commentId) {
            return commentId[i];
        }
    }

    return null;
}

export function replyComment(postId: string, commentId: string, author: User, content: string) {
    
}
