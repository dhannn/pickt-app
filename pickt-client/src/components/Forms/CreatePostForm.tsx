import React from 'react';
import { Input, Label, Select, TextArea } from '../shared/FormElements';
import formStyles from './Forms.module.css'
import globalStyles from './../../index.module.css'
import Button from '../shared/Button/Button';

type CreatePostProperties = {
    isFormFocused: boolean,
    setFocused?: Function
}

export default function CreatePostForm(props: CreatePostProperties) {    
    const formTags = ['Need Feedback','Discussion', 'Question', 'Tips & Tricks', 'Others'];

    const { isFormFocused, setFocused } = props;
    return isFormFocused? renderActiveForm(): renderInactiveForm();

    function renderActiveForm() {
        return (
            <form className={formStyles['form']}>
                <div className={formStyles['post-title'] + ' ' + globalStyles['rounded-10px'] + ' ' + formStyles['formInput']}>
                    <Label classNames={formStyles['post-title-label']} value='Title'/>
                    <Input classNames={`${globalStyles['rounded-10px']} ${formStyles['post-title-input']}`} style={{padding: '10px', background: 'none', borderColor: 'white'}} />
                </div>


                <Label value='Tag' classNames={formStyles['post-tag-label']}/>
                <Select choices={formTags}  classNames={formStyles['formInput']} style={{width: '10vw'}}/>
                <Label value='Post'/>
                <TextArea style={{height: '25vh'}} classNames={formStyles['formInput']}/>

                <div className={formStyles['post-button-container']}>
                    <Button type='primary' classNames={formStyles['post-button']} value='Post' onClick={(e) => {e.preventDefault()}}/>
                    <Button type='secondary' classNames={formStyles['post-button']} value='Cancel' onClick={(e) => {e.preventDefault()}} />
                </div>
            </form>
        );
    }
    
    function renderInactiveForm() {
        return (
            <form className=''>
                <Label value='Title'/>
            </form>
        );
    }
}

