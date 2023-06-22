import React from "react";
import { Comment } from "../../types/Comment";
import { VoteComponent } from "../shared/Vote/VoteComponent";
import { Link } from "react-router-dom";
import Avatar from "../shared/Avatar/Avatar";

import commentStyles from './Comment.module.css'
import { getRelativeDateTime } from "../../utils/format";
import Button from "../shared/Button/Button";

type CommentProperty = {
    info: Comment,
    level: number
}

export function CommentComponent(props: CommentProperty) {
    const {info, level} = props;
    const paddingSize = level * 2;

    const { _id, content, metadata, voteInfo } = info;

    const relativeDate = getRelativeDateTime(new Date(metadata.createdAt))

    return (
        <div className={`${commentStyles['comment']}`} style={{width: `${30 - paddingSize}vw`, left: `${paddingSize + 2}vw`}}>
            <VoteComponent voteInfo={voteInfo} styles={{position: 'absolute'}}/>

            <div className={`${commentStyles['metadata-container']}`}>
                <Link style={{position: 'relative', left: '-1vw'}} to={`/user/${metadata.author._id}`}>
                    <Avatar size='small' /> 
                </Link>

                <div>
                    <Link to={`/user/${metadata.author._id}`}>
                        { metadata.author.name.firstName } { metadata.author.name.lastName }
                    </Link>
                    
                    <p>{relativeDate}</p>
                </div>

            </div>
            
            <p className={`${commentStyles['content']}`} style={{left: `${8}vw`, width: `${25 - paddingSize}vw`}}>{content}</p>
            {/* <Button type='primary' value='Reply' onClick={() => {}}/> */}
        </div>
    );
}