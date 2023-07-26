
import { Request } from 'express';
import { Response } from 'express';
import { PostInsert, PostQuery, findPostById, findPosts, insertPost, findComments, findCommentById, insertComment, PostUpdate, updatePost, updateComment } from '../models/PostDB';
import { Post } from '../schema/Post';

export async function getPosts(req: Request, res: Response) {
    const query = parsePageQuery(req.query);
    let posts = await findPosts(query as PostQuery);

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(posts);
}

export async function getPostById(req: Request, res: Response) {
    const postId = req.params.postId;
    const post = await findPostById(postId);

    if (post === null) {
        return res.status(404).json({
            message: 'Cannot find post'
        });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(post);
}

export async function getComments(req: Request, res: Response) {
    const postId = req.params.postId;
    let comments = await findComments(postId);
    if (!comments) {
        return res.status(404).json({
            message: 'Cannot find post'
        })
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(comments);
}

export async function getCommentById(req: Request, res: Response) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    if (!await findPostById(postId)) {
        return res.status(404).json({
            message: 'Cannot find post'
        });
    }

    const comment = await findCommentById(postId, commentId);

    if (!comment) {
        return res.status(404).json({
            message: 'Cannot find comment'
        });
    }
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(comment);
}

export async function createPost(req: Request, res: Response) {
    const data: Post = req.body;
    console.log(data);
    
    const post = await insertPost(data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).json(post);
}

export async function createComment(req: Request, res: Response) {
    const data = parseCommentBody(req.body, req.params);    
    const comment = await insertComment(data);    

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).json(comment);
}

export async function editPost(req: Request, res: Response) {
    const data = parseEditPostBody(req.body, req.params);

    if (!await findPostById(req.params.postId)) {
        return res.status(200).json({
            message: 'Cannot find post'
        });
    }

    const post = await updatePost(data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(post);
}

export async function editComment(req: Request, res: Response) {
    const data = parseEditCommentBody(req.body, req.params);
    
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!await findPostById(req.params.postId)) {
        return res.status(404).json({
            message: 'Cannot find post'
        });
    }

    const comment = await updateComment(data);

    if (!comment) {
        return res.status(404).json({
            message: 'Cannot find comment'
        });
    }

    res.status(200).json(comment);
}

export async function votePost(req: Request, res: Response) {
    const data = { id: req.params.postId, vote: Number(req.params.vote) };
    const post = await updatePost(data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(post);
}

export async function voteComment(req: Request, res: Response) {
    const data = { 
        postId: req.params.postId,
        commentId: req.params.commentId, 
        upvote: Number(req.params.upvote),
        downvote: Number(req.params.downvote) 
    };
    
    const comment = await updateComment(data);
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(comment);
}

export async function deletePost(req: Request, res: Response) {
    const data = { id: req.params.postId, isDeleted: true };
    const post = await updatePost(data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(post);
}

export async function deleteComment(req: Request, res: Response) {
    const data = { 
        postId: req.params.postId, 
        commentId: req.params.commentId, 
        isDeleted: true 
    };
    
    const post = await updateComment(data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(post);
}

function parsePageQuery(query: any) {
    let obj: Record<string, any> = {
        page: query.page,
        attr: {}
    };

    if (query.tag !== undefined) {
        obj.attr.tag = query.tag;
    }

    if (query.username !== undefined) {
        obj.attr.username = query.username;
    }
    
    return obj;
}

function parseCreatePostBody(body: any) {
    return {
        content: {
            title: body['title'],
            content: body['content'],
            photoUrl: body['photo-url']
        }, 
        author: {
            fullName: {
                firstName: body['firstname'],
                lastName: body['lastname']
            }, 
            username: body['username'],
            profilePictureURL: body['profile-picture-url']
        },
        tag: body['tag']
    };
}

function parseEditPostBody(body: any, params: any) {
    return {
        id: params.postId,
        tag: body['tag'],
        content: body['content']
    };
}

function parseEditCommentBody(body: any, params: any) {
    return {
        postId: params.postId,
        commentId: params.commentId,
        content: body['content']
    };
}

function parseCommentBody(body: any, params: any) {
    return {
        content: body.content,
        author: body.metadata.author,
        postId: params.postId,
        commentId: params.commentId
    };
}
