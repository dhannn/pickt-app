import React, { useRef, useState } from "react";
import { Comment } from "../../types/Comment";
import { VoteComponent } from "../shared/Vote/VoteComponent";

import commentStyles from './Comment.module.css'
import Button from "../shared/Button/Button";
import { useUserAuth } from "../../hooks/useUserAuth";
import { DeletedComment } from "./DeletedComment";
import { EditDeleteOption } from "../shared/Button/EditDeleteOption";
import { CommentMetadataComponent } from "./CommentMetadataComponent";
import { EditComment } from "./EditComment";
import { ContentComponent } from "./CommentContent";
import { ReplyComment } from "./ReplyComment";

type CommentProperty = {
    info: Comment,
    level: number
}

type CommentState = 'display' | 'edit' | 'reply' | 'delete'

export function CommentComponent(props: CommentProperty) {
    const { info, level } = props;
    const { content, metadata, voteInfo, isDeleted } = info;
    const { author, createdAt } = metadata;

    const [ state, setState ] = useState<CommentState>(isDeleted? 'delete': 'display');

    const editInputRef = useRef<HTMLTextAreaElement>(null);
    const replyInputRef = useRef<HTMLTextAreaElement>(null);

    const { user } = useUserAuth()!;
    const isUserCommenterSame = user?.username === author.username;

    if (state === 'delete')
        return <DeletedComment level={ level }/>
    
    
    const editDeleteOptionComponent = (
        <EditDeleteOption 
            handleDelete={handleDeleteOption}
            handleEdit={handleEditOption}
        />
    );

    const editComponent = (
        <EditComment 
            comment={ info } 
            editInputRef={ editInputRef } 
            handleEdit={ handleEdit } 
            handleCancel={ handleCancel }
        />
    );

    const replyComponent = (
        <ReplyComment level={level + 1} author={ user! } parent={ info } handleReply={ handleReply } handleCancel={ handleCancel }/>
    );
    
    const contentComponent = (
        <>
            <ContentComponent 
                level={ level } 
                content={ content }
            />
        
            <Button
                classNames={commentStyles['reply-button']}
                type='secondary'
                value='Reply'
                onClick={ handleReplyOption } 
            />
        </>
    );

    return (
        <>
            <div className={`${commentStyles['comment']}`} style={getCommentDivStyle()}>
                { isUserCommenterSame && editDeleteOptionComponent }

                <VoteComponent classNames={ commentStyles['vote-info'] } voteInfo={voteInfo} />
                <CommentMetadataComponent author={ author } createdAt={ createdAt }/>

                { state === 'edit'? editComponent: contentComponent }
            </div>
            { state === 'reply' && replyComponent }
        </>
    );

    function handleDeleteOption() {
        setState('delete');
        info.isDeleted = true;
    }

    function handleEditOption() {
        setState('edit');
    }

    function handleReplyOption() {
        setState('reply');
    }

    function handleReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        let newComment: Comment;

        setState('display');
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setState('display');
    }

    function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        info.content = editInputRef.current?.value!;
        setState('display');
    }

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