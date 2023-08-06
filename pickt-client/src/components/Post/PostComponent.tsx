import React, { useContext, useRef, useState } from "react";
import { Post, PostContent, PostMetadata } from "../../types/Post";
import { PostTag } from "./PostTag";

import globalStyles from './../../index.module.css';
import postStyles from './Post.module.css';
import { getRelativeDateTime, htmlify } from "../../utils/format";
import { VoteComponent } from "../shared/Vote/VoteComponent";
import { Link } from "react-router-dom";
import { CommentList } from "../Comment/CommentList";
import { UserAuthProvider, getUserAuthContext } from "../../hooks/useUserAuth";
import { TextArea } from "../shared/FormElements";
import { LoginSignup } from "../shared/Button/LoginSignup";
import Button from "../shared/Button/Button";
import { Comment } from "../../types/Comment";
import { createComment, deletePost, editPost } from "../../services/post/PostServices";
import { faBolt, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PostState = 'display' | 'edit' | 'delete';

export function PostComponent(props: Post) {
    const { content, metadata, voteInfo, comments, _id, isDeleted } = props;
    
    const [ state, setState ] = useState<PostState>('display');
    const editInputRef = useRef<HTMLTextAreaElement>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null);
    
    const contentComponents = renderContent(content, metadata);
    const Context = getUserAuthContext();
    const userAuth = useContext(Context);

    if (isDeleted) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20vh'}}>
                <h1 style={{textAlign: 'center', color: 'var(--black)', fontSize: '2.5rem'}}>Oh snap! The user deleted this post.</h1>
                <FontAwesomeIcon style={{fontSize: '15rem', color: 'var(--lavender)', marginTop: '5vh'}} icon={faBolt} />
                <Link style={{textAlign: 'center', marginTop: '5vh'}} to='/'>Go Home</Link>
            </div>
        );
    }

    return (
        <div>
            {
                (userAuth?.user?.username === metadata.author.username) &&
                <>
                    <FontAwesomeIcon onClick={() => {
                        setState(() => 'edit')
                    }} icon={faPenToSquare} style={{cursor: 'hand', left: '38vw', top: '15vh', position: 'absolute', fontSize: '1.2rem', color: 'var(--lavender)'}}/>
                    <FontAwesomeIcon onClick={() => {
                        setState(() => 'delete');
                        deletePost(_id);
                    }} icon={faTrashCan} style={{cursor: 'hand', left: '40vw', top: '15vh', position: 'absolute', fontSize: '1.2rem', color: 'var(--lavender)'}}/>
                </>
            }

            <VoteComponent postId={_id} voteInfo={voteInfo} styles={{position: 'absolute', left: '3vw', top: '20vh'}}/>
            { contentComponents }
            <div style={{paddingBottom: '10vh'}}>
                <h1 style={{margin: '10vh 0vw 5vh 5vw'}}>Comments</h1>
                {userAuth?.user? renderCommentTextArea(): renderLoginSignupButton()}
                <CommentList postId={_id} comments={comments!}/>
            </div>
        </div>
    );

    function renderCommentTextArea() {
        return(
            <form>
                <TextArea ref={ commentRef } required style={{width: '35vw', margin: '0vh 0vw 5vh 5vw', height: '10vh'}}/>
                <Button style={{left: '-6vw'}} value='Comment'type='primary' onClick={ handleComment }/>
            </form>
        );
    }

    function renderLoginSignupButton() {
        return (
            <LoginSignup style={{width: '37vw', marginLeft: '5vw', marginBottom: '5vh', marginTop: '-1vh'}} message='to comment.'/>
        );
    }

    function renderContent(postInfo: PostContent, postMetadata: PostMetadata) {
        const { title, content, photoUrl } = postInfo;
        const { tag, createdAt, author } = postMetadata;

        const relativeDate = getRelativeDateTime(new Date(createdAt));
        const htmlified = htmlify(content);
        
        return (
            <>
                <div className={`${postStyles['photo-full']}`} style={{backgroundImage: `url("${photoUrl}")`, backgroundPosition: 'center'}}></div>
                <div className={`${postStyles['full-post']}`}>
                    <PostTag tag={ tag }/>
                    <h1 className={`${postStyles['title-full']}`}>{ title }</h1>
                    <Link className={`${globalStyles['inline']} ${postStyles['author']}`} to={`/user/@${ author.username }`}> @{ author.username } </Link>
                    <p className={`${globalStyles['inline']} ${postStyles['date']}`}> &#x2022; { relativeDate } </p>

                    {
                        state === 'display' &&
                        <p className={postStyles['content-full']} dangerouslySetInnerHTML={{ __html: htmlified }}/>
                    }
                    
                    { 
                        state === 'edit' &&
                        <>
                            <TextArea ref={ editInputRef } style={{marginTop: '2vh'}}>{content}</TextArea>
                            <Button style={{marginLeft: '-.05vw'}} type='primary' onClick={handleEdit}>Edit</Button>
                            <Button style={{}} type='secondary' onClick={() => {setState('display')}}>Cancel</Button>
                        </>
                    }
                </div>
            </>
        );
    }

    function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        
        let data = {
            content: editInputRef.current?.value!.trim()!
        }

        if (data.content !== content.content) {
            editPost(data, _id);
        }
        
        setState('display');
    }

    function handleComment(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        console.log(commentRef.current?.value);
        
        
        let newComment: Comment = {
            content: commentRef.current?.value!,
            metadata: {
                author: userAuth?.user!
            },
            voteInfo: {
                upvotes: 0,
                downvotes: 0
            }
        };

        createComment(newComment, _id);
    }
}
