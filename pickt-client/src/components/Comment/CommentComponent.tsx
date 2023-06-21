import React from "react";
import { Comment } from "../../types/Comment";
import { VoteComponent } from "../shared/Vote/VoteComponent";
import { Link } from "react-router-dom";
import Avatar from "../shared/Avatar/Avatar";

type CommentProperty = {
    info: Comment,
    level: number
}

export function CommentComponent(props: CommentProperty) {
    const {info, level} = props;
    const paddingSize = level * 2;

    const { _id, content, metadata, voteInfo } = info;

    return (
        <div>
            <VoteComponent voteInfo={voteInfo}/>

            <Link to={`/user/${metadata.author._id}`}>
                <Avatar size='medium'/> 
                <p>{ metadata.author.name.firstName } { metadata.author.name.lastName }</p>
            </Link>
            
            <p>{content}</p>
        </div>
    );
}