import React from "react";
import { Comment } from "../../types/Comment";
import { CommentComponent } from "./CommentComponent";

type CommentLevel = {
    info: Comment,
    postId: string,
    level: number
};

type CommentListProps = {
    comments: Comment[],
    postId: string
}

export function CommentList(props: CommentListProps) {
    const comments = props.comments;
    const stack: CommentLevel[] = [];
    let components: React.JSX.Element[] = [];
    
    comments.reverse();
    comments.forEach(comment => {
        stack.push({info: comment,  level: 0, postId: props.postId});
    });

    while (stack.length > 0) {
        const comment = stack.pop();
        if (comment === undefined) break;
        
        components.push(renderComment(comment.info, comment.level, comment.postId));

        comment.info.replies?.reverse();
        if (comment.info.replies !== undefined) {
            comment.info.replies.forEach(
                reply => stack.push({info: reply, level: comment.level + 1, postId: props.postId})
            );
        }
    }

    return components;

    function renderComment(info: Comment, level: number, postId: string) {
        return <CommentComponent postId={postId} info={info} level={level}/>
    }
}