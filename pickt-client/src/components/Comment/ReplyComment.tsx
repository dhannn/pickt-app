import React, { RefObject } from "react";
import { Comment } from "../../types/Comment"
import { CommentComponent } from "./CommentComponent";
import { User } from "../../types/User";

import styles from './Comment.module.css'
import { Link } from "react-router-dom";
import Avatar from "../shared/Avatar/Avatar";
import { CommentMetadataComponent } from "./CommentMetadataComponent";
import { TextArea } from "../shared/FormElements";
import Button from "../shared/Button/Button";

type ReplyCommentProps = {
    parent: Comment,
    level: number,
    author: User,
    handleReply: React.MouseEventHandler<HTMLButtonElement>,
    handleCancel: React.MouseEventHandler<HTMLButtonElement>,
    replyInputRef: RefObject<HTMLTextAreaElement>
}

export function ReplyComment(props: ReplyCommentProps) {
    const { level, author, handleReply, handleCancel, replyInputRef } = props;

    return (
            author !== undefined &&
            <div className={styles['comment']} style={getCommentDivStyle()}>
            <CommentMetadataComponent author={ author }/>

            <form className={ styles['edit-comment-form'] }>
                <TextArea ref={replyInputRef}  classNames={ styles['editbox'] } >
                </TextArea>
                
                <Button type='primary' value='Reply' onClick={ handleReply }/>
                <Button type='secondary' value='Cancel' onClick={ handleCancel }/>
                </form>
            </div>
    );

    function getCommentDivStyle() {
        const leftPadding = level * 2;
        const baseWidth = 25;
        const basePadding = 5;

        return ({
            width: `${baseWidth - leftPadding}vw`, 
            left: `${leftPadding + basePadding}vw`
        });
    }
}
