import { User } from "./User";
import { Vote } from "./Vote";

export type Post = {
    content: PostContent,
    metadata: PostMetadata,
    voteInfo: Vote,
    comments?: Comment[]
};

export type PostContent = {
    title: string,
    content: string,
    photoUrl?: string,
}

export type PostMetadata = {
    tag: PostTag,
    author: User,
    createdAt: Date,
}

export type PostTag = 'Need Feedback' | 'Discussion' | 'Question' | 'Tips & Tricks' | 'Others';

