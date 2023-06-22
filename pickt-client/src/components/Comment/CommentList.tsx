import React from "react";
import { Comment } from "../../types/Comment";
import { CommentComponent } from "./CommentComponent";

type CommentLevel = {
    info: Comment,
    level: number
};

type CommentListProps = {
    comments: Comment[]
}

export function CommentList(props: CommentListProps) {
    const comments = props.comments;
    const stack: CommentLevel[] = [];
    let components: React.JSX.Element[] = [];
    
    comments.reverse();
    comments.forEach(comment => {
        stack.push({info: comment,  level: 0});
    });

    while (stack.length > 0) {
        const comment = stack.pop();
        if (comment === undefined) break;
        
        components.push(renderComment(comment.info, comment.level));

        comment.info.replies?.reverse();
        if (comment.info.replies !== undefined) {
            comment.info.replies.forEach(
                reply => stack.push({info: reply, level: comment.level + 1})
            );
        }
    }

    return components;

    function renderComment(info: Comment, level: number) {
        return <CommentComponent info={info} level={level}/>
    }
}