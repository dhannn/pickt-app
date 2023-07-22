import express from 'express';
import { createPost, getPosts, getPostById, getComments, getCommentById, createComment, editPost, votePost, deletePost, editComment, voteComment, deleteComment } from '../controllers/PostController';
import bodyParser from 'body-parser';

export const router = express.Router();

/**
 * API Endpoints
 * GET      /posts/                                     
 *          Get a list of posts
 * 
 * GET      /posts/:postId/                             
 *          Get a specific post
 * 
 * GET      /posts/:postId/comments/                    
 *          Get a list of comments in a specific post
 * 
 * GET      /posts/:postId/comments/:commentId/         
 *          Get a specific comment from a given post
 * 
 * POST     /posts/                                     
 *          Create a post
 * 
 * POST     /posts/:postId/comments/                    
 *          Create a comment
 * 
 * POST     /posts/:postId/comments/:commentId/         
 *          Create a reply to a comment
 * 
 * PATCH    /posts/:postId/                             
 *          Edit a post
 * 
 * PATCH    /posts/:postId/comments/:commentId/                             
 *          Edit a comment
 * 
 * PATCH    /posts/:postId/votes/:vote/                       
 *          Upvotes or downvotes a post
 * 
 * PATCH    /posts/:postId/comments/:commentId/votes/
 *          Upvotes or downvotes a comment
 * 
 * DELETE   /posts/:postId/
 *          Delete a post
 * 
 * DELETE   /posts/:postId/comments/:commentId/
 *          Delete a comment
 */

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes for GET requests
 */
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.get('/:postId/comments', getComments);
router.get('/:postId/comments/:commentId', getCommentById);

/**
 * Routes for POST requests
 */

router.post('/', createPost);
router.post('/:postId/comments', createComment);
router.post('/:postId/comments/:commentId', createComment);

/**
 * Routes for PATCH requests
 */
router.patch('/:postId', editPost);
router.patch('/:postId/comments/:commentId', editComment);
router.patch('/:postId/votes/:vote', votePost);
router.patch('/:postId/comments/:commentId/votes/:vote', voteComment);

/**
 * Routes for DELETE requests
 */

router.delete('/:postId', deletePost);
router.delete('/:postId/comments/:commentId', deleteComment);
