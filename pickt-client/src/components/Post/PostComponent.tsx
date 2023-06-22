import React from "react";
import { Post, PostContent, PostMetadata } from "../../types/Post";
import { PostTag } from "./PostTag";

import globalStyles from './../../index.module.css';
import postStyles from './Post.module.css';
import { getRelativeDateTime, htmlify } from "../../utils/format";
import { VoteComponent } from "../shared/Vote/VoteComponent";
import { Link } from "react-router-dom";
import { CommentList } from "../Comment/CommentList";

export function PostComponent(props: Post) {
    const { content, metadata, voteInfo, comments } = props;
    
    const contentComponents = renderContent(content, metadata);

    return (
        <div>
            <VoteComponent voteInfo={voteInfo} styles={{position: 'absolute', left: '3vw', top: '20vh'}}/>
            { contentComponents }
            <div style={{paddingBottom: '10vh'}}>
                <h1 style={{margin: '10vh 0vw 5vh 5vw'}}>Comments</h1>
                <CommentList comments={comments!}/>
            </div>
        </div>
    );    

    function renderContent(postInfo: PostContent, postMetadata: PostMetadata) {
        const { title, content, photoUrl } = postInfo;
        const { tag, createdAt, author } = postMetadata;

        const relativeDate = getRelativeDateTime(new Date(createdAt));
        const htmlified = htmlify(content);
        
        return (
            <>
                <div className={`${postStyles['photo-full']}`} style={{backgroundImage: `url("${photoUrl}")`}}></div>
                <div className={`${postStyles['full-post']}`}>
                    <PostTag tag={ tag }/>
                    <h1 className={`${postStyles['title-full']}`}>{ title }</h1>
                    <Link className={`${globalStyles['inline']} ${postStyles['author']}`} to={`/user/${ author._id }`}> @{ author.username } </Link>
                    <p className={`${globalStyles['inline']} ${postStyles['date']}`}> &#x2022; { relativeDate } </p>
                    <p className={postStyles['content-full']} dangerouslySetInnerHTML={{ __html: htmlified }}/>
                </div>
            </>
        );
    }
}
