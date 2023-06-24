import React from "react";
import { Comment } from "../../types/Comment";
import { VoteComponent } from "../shared/Vote/VoteComponent";
import { Link } from "react-router-dom";
import Avatar from "../shared/Avatar/Avatar";

import commentStyles from './Comment.module.css'
import { getRelativeDateTime } from "../../utils/format";
import Button from "../shared/Button/Button";
import { TextArea } from "../shared/FormElements";

type CommentProperty = {
    info: Comment,
    level: number
}

export function CommentComponent(props: CommentProperty) {
    const {info, level} = props;
    const leftValue = level * 2;

    const { _id, content, metadata, voteInfo } = info;

    const relativeDate = getRelativeDateTime(new Date(metadata.createdAt))

    return (
        <div className={`${commentStyles['comment']}`} style={{width: `${25 - leftValue}vw`, left: `${leftValue + 5}vw`}}>
            <VoteComponent voteInfo={voteInfo} styles={{position: 'absolute', left: '1.5vw'}}/>

            <div className={`${commentStyles['metadata-container']}`}>
                <Link style={{position: 'relative', left: '-1.5vw'}} to={`/user/@${metadata.author.username}`}>
                    <Avatar size='small' url={metadata.author.profilePictureURL}/> 
                </Link>

                <div>
                    <Link to={`/user/@${metadata.author.username}`}>
                        { metadata.author.name.firstName } { metadata.author.name.lastName }
                    </Link>
                    
                    <p>{relativeDate}</p>
                </div>

            </div>
            
            <p className={`${commentStyles['content']}`} style={{left: `${5.5}vw`, width: `${24 - leftValue}vw`}}>{content}</p>
            <Button style={{left: '4.5vw', top: '1vh'}} type='secondary' value='Reply' onClick={() => {}}/>
        </div>
    );
}