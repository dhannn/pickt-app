import { User } from "./User";
import { Vote } from "./Vote";

export type Comment = {
    _id?: string,
    content: string,
    metadata: CommentMetadata,
    voteInfo: Vote,
    replies?: Comment[],
    isDeleted?: boolean
};

export type CommentMetadata = {
    author: User,
    createdAt?: Date,
    lastModified?: Date
}
