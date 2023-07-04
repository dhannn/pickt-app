import { getDb } from "./db";
import { Post } from "../types/Post";

const db = getDb();
const postCursor = db.collection('posts').find({});


let posts: Post[] = [];
postCursor.stream().on('data', doc => posts.push(doc));



// while () {
    
//     postCursor.next()
//         .then((res) => {
//             let post: Post = {
//                 _id: res!['_id'].toHexString(),
//                 content: res!['content'],
//                 metadata: res!['metadata'],
//                 voteInfo: res!['voteInfo']
//             }

//             posts.push(post);
//         })
// }
export function getPosts() {
    return posts;
}
