/**
 * API Endpoints
 * 
 * GET      /users/
 * GET      /users/:id
 * POST     /users/
 * PATCH    /users/:id
 * DELETE   /users/:id 
 */

import bodyParser from "body-parser";
import express from "express";


export const router = express.Router();

router.use(bodyParser.json());

router.get('/');
router.get('/:id');

router.post('/');

router.patch('/:id');

router.delete('/:id');
