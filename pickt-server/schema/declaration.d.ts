import { SessionData } from "express-session"
import { User } from "./User";
import { Request } from "express";

declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}
