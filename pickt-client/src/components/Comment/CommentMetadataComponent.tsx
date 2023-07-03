import React from "react";
import { Link } from "react-router-dom";
import { CommentMetadata } from "../../types/Comment";
import Avatar from "../shared/Avatar/Avatar";
import { getRelativeDateTime } from "../../utils/format";

import commentStyles from './Comment.module.css';
import Button from "../shared/Button";
import { TextArea } from "../shared/FormElements";

export function CommentMetadataComponent(props: CommentMetadata) {
    const { author: { username, profilePictureURL, fullName: { firstName, lastName } }, createdAt } = props;
    const relativeDate = getRelativeDateTime(new Date(createdAt!));

    return (
        <div className={`${commentStyles['metadata-container']}`}>
            <Link 
                className={commentStyles['metadata-profile-picture']} 
                to={`/user/@${ username }`}
            >
                <Avatar size='small' url={ profilePictureURL }/> 
            </Link>

            <div>
                <Link to={`/user/@${ username }`}>
                    { firstName } { lastName }
                </Link>
                    
                <p>{ createdAt && relativeDate }</p>
            </div>
        </div>
    );
}
