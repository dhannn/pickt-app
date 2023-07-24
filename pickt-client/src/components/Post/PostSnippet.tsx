import React, { CSSProperties } from 'react';
import { Post, PostContent, PostMetadata } from '../../types/Post';
import { VoteComponent } from '../shared/Vote/VoteComponent';
import { Vote } from '../../types/Vote';
import { PostTag } from './PostTag';

import postStyles from './Post.module.css'
import globalStyles from './../../index.module.css'
import { getRelativeDateTime } from '../../utils/format';
import { Link } from 'react-router-dom';
import { Comment } from '../../types/Comment';

export function PostSnippet(props: Post) {
    const { _id, content, voteInfo, metadata, comments } = props;
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
            <Link to={`/post/${_id}`}>
                { contentComponent }
            </Link>
        </div>
    );

    function getCommentCount() {
        let stack: Comment[] = [];

        comments?.forEach((c) => {
            stack.push(c);
        });        

        let count = 0;

        while (stack.length !== 0) {
            let comment = stack.pop();
            
            if(comment?.replies) {
                comment.replies.forEach((c) => {
                    stack.push(c);
                });
            }

            count++;
        }

        return count;
    }

    function renderVoteComponent(voteInfo: Vote, darkBg: boolean = false) {
        const style: CSSProperties = {float: 'left', padding: '7vh 3vw 10vh'};

        return <VoteComponent postId={_id} voteInfo={voteInfo} styles={ style } darkBg={darkBg} />;
    }
    
    function renderContent(postContent: PostContent, postMetadata: PostMetadata) {
        const { title, content } = postContent;
        const { tag, author, createdAt } = postMetadata;
        const relativeDate = getRelativeDateTime(new Date(createdAt));

        const truncatedContent = truncatePost(content);

        const commentCount = getCommentCount();
        return (
            <div className={`${postStyles['content-container']} ${globalStyles['rounded-10px']}`}>
                <p> <PostTag tag={tag}/>      </p>
                <h1 className={`${postStyles['title']}`}>{ title }       </h1>
                <Link to={`/user/@${author.username}`} className={`${globalStyles['inline']} ${postStyles['author']}`}> @{ author.username } </Link>
                <p className={`${globalStyles['inline']} ${postStyles['date']}`}> &#x2022; { relativeDate } </p>
                <p className={postStyles['content']} dangerouslySetInnerHTML={{ __html: truncatedContent }}/>
                
                <p style={{color: 'var(--greenish-gray)', fontSize: 'var(--small-font-size)', marginTop: '1vh'}}>{ `${commentCount} comment${commentCount > 1? 's': ''}` }</p>
            </div>
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

        truncated = truncated.trimEnd().replace(/\n/g, '<br/>');
        return truncated;
    }
}

