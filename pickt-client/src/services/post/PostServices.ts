import { Post } from '../../types/Post';
import object from './../../data/Posts.json';

let postsJSON: Post[];
postsJSON = object;

export function getPosts() {
    return postsJSON;
}

export function getPostById(id: string) {
    for (let i in postsJSON) {
        console.log(postsJSON[i]);
    }
}
