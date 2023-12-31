import React, { useEffect, useRef, useState } from 'react';
import { Input, Label, Select, TextArea } from '../shared/FormElements';
import formStyles from './Forms.module.css'
import globalStyles from './../../index.module.css'
import Button from '../shared/Button/Button';
import { createPost } from '../../services/post/PostServices';
import { useUserAuth } from '../../hooks/useUserAuth';
import { Post, PostTag } from '../../types/Post';
import { redirect } from 'react-router-dom';
import { AddPicture } from './AddPicture';
import { useLoading } from '../../hooks/useLoading';

type CreatePostProperties = {
    isFormFocused: boolean,
    setFocused?: Function
}

export default function CreatePostForm(props: CreatePostProperties) {    
    const formTags = ['Need Feedback','Discussion', 'Question', 'Tips & Tricks', 'For Highlight', 'Others'];
    const { isLoading, loadingIcon, setLoading } = useLoading();
    
    const { isFormFocused, setFocused } = props;
    const [ pictureBase64, setPicture ] = useState<string>('');
    const form = useRef<HTMLFormElement>(null);
    const userAuth = useUserAuth();
    const titleRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLSelectElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
 
    useEffect(() => {
        setLoading(false);
    }, []);

    if (isLoading) { return loadingIcon; }

    return isFormFocused? renderActiveForm(): renderInactiveForm();
    

    function renderActiveForm() {
        return (
            <form ref={form} className={`${formStyles['form']} ${formStyles['active-form']}`}>   
                <AddPicture isFocused={isFormFocused} setFocus={() => {}} photo={pictureBase64} setPhoto={setPicture}/>
                <div className={formStyles['post-title'] + ' ' + globalStyles['rounded-10px'] + ' ' + formStyles['formInput']}>
                    <Label classNames={formStyles['post-title-label']} value='Title'/>
                    <Input ref={titleRef} required classNames={`${globalStyles['rounded-10px']} ${formStyles['post-title-input']}`} style={{padding: '10px', background: 'none', borderColor: 'white'}} />
                </div>


                <Label value='Tag' classNames={formStyles['post-tag-label']}/>
                <Select required choices={formTags} ref={tagRef} classNames={formStyles['formInput']} style={{width: '10vw'}}/>
                <Label value='Post'/>
                <TextArea ref={contentRef} required style={{height: '25vh'}} classNames={formStyles['formInput']}/>

                <div className={formStyles['post-button-container']}>
                    <Button type='primary' classNames={formStyles['post-button']} value='Post' onClick={handleSubmit}/>
                    <Button type='secondary' classNames={formStyles['post-button']} value='Cancel' onClick={handleCancel} />
                </div>
            </form>
        );
    }

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        if (form.current?.checkValidity()) {
            setLoading(true);
            
            const post: Post = {
                _id: '',
                content: {
                    title: titleRef.current!.value,
                    content: contentRef.current!.value,
                    photoUrl: pictureBase64
                },
                metadata: {
                    tag: tagRef.current?.value! as PostTag,
                    author: userAuth?.user!,
                    createdAt: new Date()
                },
                voteInfo: {
                    upvotes: 0,
                    downvotes: 0
                }
            };
            
            createPost(post)
                .then(() => {
                    setFocused!(false);
                    setLoading(false);
                    window.location.reload();
                });
        } else {
            form.current?.reportValidity()
        }
    }

    function handleCancel(e: React.MouseEvent) {
        e.preventDefault();
        setFocused!(false);
        form.current?.classList.remove(formStyles['active-form']);
    }
    
    function renderInactiveForm() {
        return (
            <form ref={form} className={formStyles['form']}>                
                <div className={formStyles['post-title'] + ' ' + globalStyles['rounded-10px'] + ' ' + formStyles['formInput']}>
                    <Input classNames={`${formStyles['post-title-input']}`} onFocus={() => {setFocused!(true)}} style={{padding: '10px', background: 'none', borderColor: 'white'}} placeholder='Create a Post'/>
                </div>
            </form>
        );
    }
}

