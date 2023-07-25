import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CommentMetadata } from "../../types/Comment";
import Avatar from "../shared/Avatar/Avatar";
import { getRelativeDateTime } from "../../utils/format";

import commentStyles from './Comment.module.css';
import Button from "../shared/Button";
import { TextArea } from "../shared/FormElements";

export function CommentMetadataComponent(props: CommentMetadata) {
    const { author: { username, profilePictureURI: profilePictureURL, fullName: { firstName, lastName } }, createdAt, lastModified, } = props;
    const [ relativeCreatedAt, setRelativeCreatedAt ] =  useState('');
    const [ relativeLastModified, setRelativeLastModified ] =  useState('');

    useEffect(() => {
        const relativeCreativeAt = getRelativeDateTime(new Date(createdAt!));
        setRelativeCreatedAt(relativeCreativeAt);
        const relativeLastModified = getRelativeDateTime(new Date(lastModified!));
        setRelativeLastModified(relativeLastModified);
    }, [lastModified]);


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
                    
                <div>
                    <p style={{display: "inline"}}>{ createdAt !== undefined && relativeCreatedAt }</p>
                    <p style={{display: "inline", color: 'gray', marginLeft: '10px', fontSize: '0.8em'}}>{ lastModified !== undefined && 'Edited ' + relativeLastModified }</p>
                </div>
            </div>
        </div>
    );
}
