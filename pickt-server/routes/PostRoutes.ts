import express from 'express';
import { getAllPosts } from '../controllers/PostController';
export const router = express.Router();

/**
 * API Endpoints
 * GET      /posts/                                 Get a list of posts
 * GET      /posts/:postId/                         Get a specific post
 * GET      /posts/:postId/comments/                Get a list of comments in a specific post
 * GET      /posts/:postId/comments/:commentId/     Get a specific comment from a given post
 * POST     /posts/                                 Create a post
 * POST     /posts/:postId/comments/                Create a comment
 * PATCH    /posts/:postId/                         Edit a post
 * PATCH    /posts/:postId/votes/                   Upvotes or downvotes a post
 * PATCH    /posts/:postId/comments/votes/          Upvotes or downvotes a comment
 * DELETE   /posts/:postId/                         Delete a post
 * DELETE   /posts/:postId/comments                 Delete a comment
 */

router.get('/', getAllPosts);

router.get('/:postId', (req, res) => {
    res.send('Get an existing post with an id of ' + req.params.postId);
});

router.post('/', (_req, _res) => {

});

router.get('/filter/:tag', (req, res) => {
    res.send('Get all posts with a filter of ' + req.params.tag);
});
