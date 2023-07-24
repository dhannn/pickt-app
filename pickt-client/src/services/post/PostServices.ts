import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import object from './../../data/Posts.json';

let postsJSON: Post[];
postsJSON = object;

export async function getPosts() {
    const response = await fetch('http://localhost:3001/posts/');

    try {
        const posts = await response.json();        
        return posts;
    } catch(error) {
        console.error(error);
    }
    
}

export async function createPost(data: Post) {
    
    try {
        const response = await fetch(`http://localhost:3001/posts/`, {
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
    const response = await fetch(`http://localhost:3001/posts/${id}`);    
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
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
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
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
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
    const response = await fetch(`http://localhost:3001/posts/${postId}/${commentId}`);

    try {
        const post = await response.json();        
        return post;
    } catch(error) {
        console.error(error);
    }        
}

export async function createComment(data: Comment, postId: string, commentId?: string) {    
    const params = commentId? `${postId}/comments/${commentId}/`: `${postId}/comments`;

    console.log(params);
    

    try {
        const response = await fetch(`http://localhost:3001/posts/${params}`, {
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
        const response = await fetch(`http://localhost:3001/posts/${params}`, {
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
    const params = commentId? `${postId}/comments/${commentId}/`: `${postId}/comments`;

    try {
        const response = await fetch(`http://localhost:3001/posts/${params}`, {
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
    const params = commentId? `${postId}/comments/${commentId}/`: `${postId}`;

    try {
        const response = await fetch(`http://localhost:3001/posts/${params}`, {
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
