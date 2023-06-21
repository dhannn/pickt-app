import { Post } from '../../types/Post';
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
