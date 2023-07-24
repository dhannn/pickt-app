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
import { createComment, deleteComment, editComment } from "../../services/post/PostServices";

type CommentProperty = {
    info: Comment,
    level: number,
    postId: string
}

type CommentState = 'display' | 'edit' | 'reply' | 'delete';

export function CommentComponent(props: CommentProperty) {
    const { info, level, postId } = props;
    const { content, metadata, voteInfo, isDeleted, _id } = info;
    const { author, createdAt, lastModified } = metadata;

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
        <ReplyComment replyInputRef={ replyInputRef } level={level + 1} author={ user! } parent={ info } handleReply={ handleReply } handleCancel={ handleCancel }/>
    );
    
    const contentComponent = (
        <>
            <ContentComponent 
                level={ level } 
                content={ content }
            />
        
            {user !== undefined && <Button
                classNames={commentStyles['reply-button']}
                type='secondary'
                value='Reply'
                onClick={ handleReplyOption } 
            />}
        </>
    );

    return (
        <>
            <div className={`${commentStyles['comment']}`} style={getCommentDivStyle()}>
                { isUserCommenterSame && editDeleteOptionComponent }

                <VoteComponent postId={postId} commentId={_id} classNames={ commentStyles['vote-info'] } voteInfo={voteInfo} />
                <CommentMetadataComponent author={ author } createdAt={ createdAt } lastModified={ lastModified }/>

                { state === 'edit'? editComponent: contentComponent }
            </div>
            { state === 'reply' && replyComponent }
        </>
    );

    function handleDeleteOption() {
        setState('delete');
        deleteComment(postId!, _id!);
    }

    function handleEditOption() {
        setState('edit');
    }

    function handleReplyOption() {
        setState('reply');
    }

    function handleReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const content = replyInputRef.current?.value;
        
        let newComment: Comment = {
            content: content!,
            metadata: {
                author: user!
            },
            voteInfo: {
                upvotes: 0,
                downvotes: 0
            }
        };
        
        createComment(newComment, postId, _id!);
        setState('display');
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if (editInputRef.current)
            editInputRef.current.value = '';

        if (replyInputRef.current)
            replyInputRef.current.value = '';

        setState('display');
    }

    function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        
        let data = {
            content: editInputRef.current?.value!.trim()!
        }

        if (data.content !== content) {
            editComment(data, postId, info._id!);
        }
        
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