import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import object from './../../data/Posts.json';

let postsJSON: Post[];
postsJSON = object;

const URL = process.env.REACT_APP_SERVER_PORT;
console.log(process.env.REACT_APP_SERVER_PORT);


export async function getPosts() {
    const response = await fetch(`${URL}/posts/`);

    try {
        const posts = await response.json();        
        return posts;
    } catch(error) {
        console.error(error);
    }
    
}

export async function getPostsByUser(username: string) {
    try {
        const response = await fetch(`${URL}/posts?username=${username}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors"
        });
    
        const posts = await response.json();
        
        return posts;
    } catch(error) {
        console.error(error);
    }
}

export async function createPost(data: Post) {
    try {
        console.log(data);
        
        const response = await fetch(`${URL}/posts`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(data)
        });
    
        return response;
    } catch(error) {
        console.error(error);
    }
}


export async function getPostById(id: string) {
    const response = await fetch(`${URL}/posts/${id}/`);    
    if (response.status === 404) {
        return null;
    }

    try {
        const post = await response.json();

        return post;
    } catch(error) {
        console.error(error);
    }
}

export async function editPost(data: { content: string }, postId: string) {

    try {
        const response = await fetch(`${URL}/posts/${postId}/`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(data)
        });

        return response;
    } catch(error) {
        console.error(error);
    }
}

export async function deletePost(postId: string) {    
    try {
        const response = await fetch(`${URL}/posts/${postId}/`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return response;
    } catch(error) {
        console.error(error);
    }

}

export async function getCommentById(postId: string, commentId: string) {
    const response = await fetch(`${URL}/posts/${postId}/${commentId}/`);

    try {
        const post = await response.json();        
        return post;
    } catch(error) {
        console.error(error);
    }        
}

export async function createComment(data: Comment, postId: string, commentId?: string) {    
    const params = commentId? `${postId}/comments/${commentId}/`: `${postId}/comments/`;

    console.log(params);
    

    try {
        const response = await fetch(`${URL}/posts/${params}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(data)
        });
    
        return response;
    } catch(error) {
        console.error(error);
    }
}


export async function voteComment(data: {upvotes: number, downvotes: number}, postId: string, commentId?: string) {    
    const params = `${postId}/comments/${commentId}/votes/${data.upvotes}/${data.downvotes}`;

    try {
        const response = await fetch(`${URL}/posts/${params}/`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(data)
        });

        return response;
    } catch(error) {
        console.error(error);
    }
}

export async function editComment(data: { content: string }, postId: string, commentId: string) {    
    const params = commentId? `${postId}/comments/${commentId}/`: `${postId}/comments/`;

    try {
        const response = await fetch(`${URL}/posts/${params}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(data)
        });

        return response;
    } catch(error) {
        console.error(error);
    }
}

export async function deleteComment(postId: string, commentId: string) {    
    const params = commentId? `${postId}/comments/${commentId}/`: `${postId}/`;

    try {
        const response = await fetch(`${URL}/posts/${params}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return response;
    } catch(error) {
        console.error(error);
    }

}
