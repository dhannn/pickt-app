
import { Request } from 'express';
import { Response } from 'express';
import { PostInsert, PostQuery, findPostById, findPosts, insertPost, findComments, findCommentById, insertComment, PostUpdate, updatePost, updateComment } from '../models/PostDB';

export async function getPosts(req: Request, res: Response) {
    const query = parsePageQuery(req.query);
    let posts = await findPosts(query as PostQuery);
    
    res.status(200).json(posts);
}

export async function getPostById(req: Request, res: Response) {
    const postId = req.params.postId;
    const post = await findPostById(postId);

    if (post === null) {
        return res.status(404).json({
            message: 'Cannot find post'
        });
    }

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
    
    res.status(200).json(comment);
}

export async function createPost(req: Request, res: Response) {
    const data: PostInsert = parseCreatePostBody(req.body);
    const post = await insertPost(data);
    res.status(201).json(post);
}

export async function createComment(req: Request, res: Response) {
    const data = parseCommentBody(req.body, req.params);
    const comment = await insertComment(data);

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

    res.status(200).json(post);
}

export async function editComment(req: Request, res: Response) {
    const data = parseEditCommentBody(req.body, req.params);
    
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

    res.status(200).json(post);
}

export async function voteComment(req: Request, res: Response) {
    const data = { 
        postId: req.params.postId,
        commentId: req.params.commentId, 
        vote: Number(req.params.vote) 
    };
    
    const comment = await updateComment(data);
    
    res.status(200).json(comment);
}

export async function deletePost(req: Request, res: Response) {
    const data = { id: req.params.postId, isDeleted: true };
    const post = await updatePost(data);

    res.status(200).json(post);
}

export async function deleteComment(req: Request, res: Response) {
    const data = { 
        postId: req.params.postId, 
        commentId: req.params.commentId, 
        isDeleted: true 
    };
    
    const post = await updateComment(data);

    res.status(200).json(post);
}

function parsePageQuery(query: any) {
    return {
        page: query.page,
        attr: {
            tag: query.tag,
            username: query.username
        }
    };
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
        content: body['content'], 
        author: {
            fullName: {
                firstName: body['firstname'],
                lastName: body['lastname']
            }, 
            username: body['username'],
            profilePictureURL: body['profile-picture-url']
        },
        postId: params.postId,
        commentId: params.commentId
    };
}