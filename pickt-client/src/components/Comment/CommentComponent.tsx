import React, { useRef, useState } from "react";
import { Comment } from "../../types/Comment";
import { VoteComponent } from "../shared/Vote/VoteComponent";
import { Link } from "react-router-dom";
import Avatar from "../shared/Avatar/Avatar";

import commentStyles from './Comment.module.css'
import { getRelativeDateTime } from "../../utils/format";
import Button from "../shared/Button/Button";
import { TextArea } from "../shared/FormElements";
import { UserAuthState, useUserAuth } from "../../hooks/useUserAuth";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEllipsis, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { OptionComponent } from "../shared/Button/OptionComponent";
import { DeletedComment } from "./DeletedComment";

type CommentProperty = {
    info: Comment,
    level: number
}

export function CommentComponent(props: CommentProperty) {
    const {info, level} = props;
    const leftValue = level * 2;

    const [ deleted, setDeleted ] = useState(info.isDeleted);

    const { _id, content, metadata, voteInfo, isDeleted } = info;
    const relativeDate = getRelativeDateTime(new Date(metadata.createdAt));

    const editTextArea = useRef<HTMLTextAreaElement>(null);
    const editForm = useRef<HTMLFormElement>(null);
    const contentRef = useRef<HTMLParagraphElement>(null);

    const commentRef = useRef(info);

    const userAuth = useUserAuth();
    const options = [
        {
            name: 'Edit',
            icon: faPenToSquare,
            onClick: () => {
                editForm.current!.classList.add(commentStyles['active-edit-comment-form']);
                editTextArea.current!.innerText = contentRef.current?.textContent!
                contentRef.current!.classList.add(commentStyles['content-editing']);
            }
        },
        {
            name: 'Delete',
            icon: faDeleteLeft,
            onClick: () => {
                info.isDeleted = true;
                setDeleted(() => true);
            }
        }
    ]

    if (deleted)
        return <DeletedComment level={ level }/>

    return (
        <div className={`${commentStyles['comment']}`} style={{width: `${25 - leftValue}vw`, left: `${leftValue + 5}vw`}}>
            <VoteComponent voteInfo={voteInfo} styles={{position: 'absolute', left: '1.5vw'}}/>

            {userAuth!.user?.username === metadata.author.username?<OptionComponent options={options}/>: <></>}
            
            <div className={`${commentStyles['metadata-container']}`}>
                <Link style={{position: 'relative', left: '-1.5vw'}} to={`/user/@${metadata.author.username}`}>
                    <Avatar size='small' url={metadata.author.profilePictureURL}/> 
                </Link>

                <div>
                    <Link to={`/user/@${metadata.author.username}`}>
                        { metadata.author.name.firstName } { metadata.author.name.lastName }
                    </Link>
                    
                    <p>{ relativeDate }</p>
                </div>
            </div>

            <form ref={editForm} className={commentStyles['edit-comment-form']}>
                <TextArea classNames={commentStyles['editbox']} ref={editTextArea}/>
                <Button type='primary' value='Edit' onClick={(e) => {
                    e.preventDefault();
                    contentRef.current!.innerText = editTextArea.current!.value;
                    editForm.current!.classList.remove(commentStyles['active-edit-comment-form']);
                    contentRef.current!.classList.remove(commentStyles['content-editing']);
                }}/>
                <Button type='secondary' value='Cancel' onClick={(e) => {
                    e.preventDefault();
                    editForm.current!.classList.remove(commentStyles['active-edit-comment-form']);
                    contentRef.current!.classList.remove(commentStyles['content-editing']);
                }}/>
            </form>
            
            <p ref={contentRef} className={`${commentStyles['content']}`} style={{left: `${5.5}vw`, width: `${24 - leftValue}vw`}}>{content}</p>
            <Button style={{left: '4.5vw', top: '1vh'}} type='secondary' value='Reply' onClick={() => {}}/>
        </div>
    );
}