import { Comment } from "./Comment";
import { User } from "./User";
import { Vote } from "./Vote";

export type Post = {
    _id: string
    content: PostContent,
    metadata: PostMetadata,
    voteInfo: Vote,
    comments?: Comment[],
    isDeleted?: boolean
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
    lastModified?: Date
}

export type PostTag = 'Need Feedback' | 'Discussion' | 'Question' | 'Tips & Tricks' | 'Others';

