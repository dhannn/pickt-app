import { User } from "./User";
import { Vote } from "./Vote";

export type Comment = {
    content: string,
    metadata: CommentMetadata,
    voteInfo: Vote,
    replies?: Comment[]
};

export type CommentMetadata = {
    author: User,
    createdAt: Date,
}
