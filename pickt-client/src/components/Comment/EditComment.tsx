import React, { RefObject } from "react";
import Button from "../shared/Button";
import { TextArea } from "../shared/FormElements";
import { Comment } from "../../types/Comment";

import commentStyles from './Comment.module.css'

type EditCommentProperties = {
    comment: Comment,
    editInputRef: RefObject<HTMLTextAreaElement>,
    handleEdit: React.MouseEventHandler<HTMLButtonElement>,
    handleCancel: React.MouseEventHandler<HTMLButtonElement>
}

export function EditComment(props: EditCommentProperties) {
    const { 
        comment: { content }, 
        editInputRef, 
        handleEdit, 
        handleCancel 
    } = props;

    return (
        <form className={ commentStyles['edit-comment-form'] }>
            <TextArea ref={ editInputRef } classNames={ commentStyles['editbox'] } >
            { content }
            </TextArea>
            
            <Button type='primary' value='Edit' onClick={ handleEdit }/>
            <Button type='secondary' value='Cancel' onClick={ handleCancel }/>
        </form>
    )
}