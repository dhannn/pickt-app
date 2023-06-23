import React, { useEffect, useRef } from 'react';
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
    const form = useRef<HTMLFormElement>(null);
    
    return isFormFocused? renderActiveForm(): renderInactiveForm();


    function renderActiveForm() {
        return (
            <form ref={form} className={`${formStyles['form']} ${formStyles['active-form']}`}>   
                <div className={formStyles['post-title'] + ' ' + globalStyles['rounded-10px'] + ' ' + formStyles['formInput']}>
                    <Label classNames={formStyles['post-title-label']} value='Title'/>
                    <Input required classNames={`${globalStyles['rounded-10px']} ${formStyles['post-title-input']}`} style={{padding: '10px', background: 'none', borderColor: 'white'}} />
                </div>


                <Label value='Tag' classNames={formStyles['post-tag-label']}/>
                <Select required choices={formTags}  classNames={formStyles['formInput']} style={{width: '10vw'}}/>
                <Label value='Post'/>
                <TextArea required style={{height: '25vh'}} classNames={formStyles['formInput']}/>

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
            setFocused!(false);
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

