import { Comment } from "./Comment";
import { User } from "./User";
import { Vote } from "./Vote";

export interface Post extends Document {
    _id: String,
    content: PostContent,
    metadata: PostMetadata,
    voteInfo: Vote,
    comments?: Comment[],
    isDeleted: boolean
};

export interface PostContent {
    title: string,
    content: string,
    photoUrl?: string,
}

export interface PostMetadata  {
    tag: PostTag,
    author: User,
    createdAt: Date
}

export type PostTag = 'Need Feedback' | 'Discussion' | 'Question' | 'Tips & Tricks' | 'Others';

