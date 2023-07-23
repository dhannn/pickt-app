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
import { createUser, deactivateUser, editUserInfo as editUser, getUserByUsername, getUsers } from "../controllers/UserController";
import { doesUsernameExist, hashPassword } from "../middleware/UserMiddleware";


export const router = express.Router();

router.use(bodyParser.json({limit: '500mb'}));

router.get('/', getUsers);
router.get('/:username', doesUsernameExist, getUserByUsername);

router.post('/', hashPassword, createUser);

router.patch('/:username', doesUsernameExist, editUser);

router.delete('/:username', doesUsernameExist, deactivateUser);
