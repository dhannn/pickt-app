import React, { CSSProperties } from 'react';
import { Post, PostContent, PostMetadata } from '../../types/Post';
import { VoteComponent } from '../shared/Vote/VoteComponent';
import { Vote } from '../../types/Vote';
import { PostTag } from './PostTag';

import postStyles from './Post.module.css'
import globalStyles from './../../index.module.css'
import { getRelativeDateTime } from '../../utils/format';

export function PostSnippet(props: Post) {
    const { _id, content, voteInfo, metadata } = props;
    const voteComponent = renderVoteComponent(voteInfo, content.photoUrl !== undefined);
    const contentComponent = renderContent(content, metadata);

    let cssClasses = `${globalStyles['rounded-20px']} `;
    content.photoUrl? cssClasses += `${postStyles['post-snippet-with-photo']}`: cssClasses += `${postStyles['post-snippet']}`;
    
    const customStyles: CSSProperties = content.photoUrl !== undefined? { 
        backgroundColor: 'rgb(100, 100, 100)',
        backgroundImage: `url(${content.photoUrl})`, 
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
    }: {};

    return (
        <div className={cssClasses} style={customStyles}>
            { voteComponent }
            { contentComponent }
        </div>
    );

    function renderVoteComponent(voteInfo: Vote, darkBg: boolean = false) {
        const style: CSSProperties = {position: 'absolute', left: '2.5vw'};

        return <VoteComponent voteInfo={voteInfo} styles={ style } darkBg={darkBg} />;
    }
    
    function renderContent(postContent: PostContent, postMetadata: PostMetadata) {
        const { title, content } = postContent;
        const { tag, author, createdAt } = postMetadata;
        const relativeDate = getRelativeDateTime(new Date(createdAt));

        const truncatedContent = truncatePost(content);

        return (
            <>
                <p> <PostTag tag={tag}/>      </p>
                <h1 className={`${postStyles['title']}`}>{ title }       </h1>
                <p className={`${globalStyles['inline']} ${postStyles['author']}`}> @{ author.username } </p>
            <p className={`${globalStyles['inline']} ${postStyles['date']}`}> &#x2022; { relativeDate } </p>
                <p className={postStyles['content']} dangerouslySetInnerHTML={{ __html: truncatedContent }}/>
            </>
        );
    }

    function truncatePost(post: string): string {
        const MAX_CHAR = 180;
        const APPROX_CHAR_PER_LINE = 75;
        
        let truncated = '';
        let len = 0;

        const lines = post.split('\n');
        lines.forEach(line => {
            const words = line.split(' ');

            words.forEach(
                word => {
                    if (len + word.length > MAX_CHAR) {
                        return;
                    }

                    truncated += word + ' ';
                    len += word.length;
                }
            )

            truncated += '\n'
            len += APPROX_CHAR_PER_LINE;
        });

        truncated = truncated.trimEnd().replace('\n', '<br/>');
        return truncated;
    }
}

