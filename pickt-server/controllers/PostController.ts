
import { Request } from 'express';
import { Response } from 'express';
import { getPosts } from '../models/PostDB';
import { Post } from '../types/Post';

const PAGE_POST_LIMIT = 2;

export async function getAllPosts(req: Request, res: Response) {
    let posts: Post[] = getPosts();

    if (JSON.stringify(req.query) === '{}') {
        return res.json(posts).sendStatus(200);
    }

    const page = Number(req.query.page);
    const paginatedPosts = posts.slice(page * PAGE_POST_LIMIT - PAGE_POST_LIMIT, PAGE_POST_LIMIT * page);

    if (paginatedPosts.length === 0) return res.sendStatus(418);
    res.json(paginatedPosts).sendStatus(200);
}
