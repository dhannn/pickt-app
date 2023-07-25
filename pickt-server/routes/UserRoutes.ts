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
import { createUser, deactivateUser, editUserInfo as editUser, getUserByUsername, getUsers, login } from "../controllers/UserController";
import { doesUsernameExist, hashPassword } from "../middleware/UserMiddleware";
import cookieParser from "cookie-parser";
import session from "express-session";

export const router = express.Router();

router.use(bodyParser.json({limit: '500mb'}));
router.use(cookieParser());
router.use(session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: true
}));

router.get('/', getUsers);
router.get('/:username', doesUsernameExist, getUserByUsername);

router.post('/', hashPassword, createUser);

router.patch('/:username', doesUsernameExist, editUser);

router.delete('/:username', doesUsernameExist, deactivateUser);


router.post('/login', login)
router.post('/logout', (req, res) => {
    // Clear the session and remove the user data
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
    });
    return res.status(200).json({ message: 'Logout successful' });
});
  
