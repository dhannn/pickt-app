import React, { ChangeEvent, DragEvent, MouseEvent, MouseEventHandler, useContext, useRef, useState } from "react";
import { Input, Label, TextArea } from "../shared/FormElements";
import Button from "../shared/Button/Button";

import formStyles from './Forms.module.css'
import globalStyles from './../../index.module.css'
import { getUserAuthContext } from "../../hooks/useUserAuth";
import { emailExists, getUserByEmail, getUserByUsername, usernameExists, validatePassword } from "../../services/user/UserServices";
import { redirect, useNavigate } from "react-router-dom";

export function UserRegisterForm() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const textAreaInput = useRef<HTMLTextAreaElement>(null);
    const formElement = useRef<HTMLFormElement>(null);

    const firstPage = useRef<HTMLFormElement>(null);
    const secondPage = useRef<HTMLFormElement>(null);

    const Context = getUserAuthContext();
    const userAuth = useContext(Context);
    const navigate = useNavigate();

    const [ profilePicture, setProfilePicture ] = useState('');

    return(
        <>
        <form ref={firstPage} className={`${formStyles['user-register-form']} ${formStyles['user-register-active-page']}`} style={{backdropFilter: `blur(20px)`}}>
            <div style={{display: 'flex', gap: '0.8vw', alignSelf: 'center', marginBottom: '1vh'}}>
                <div style={{width: '0.6vw', height: '0.6vw', border: '2px solid var(--lavender-40)', backgroundColor: 'var(--lavender-40)', borderRadius: '50%'}}></div>
                <div style={{width: '0.6vw', height: '0.6vw', border: '2px solid var(--lavender-40)', borderRadius: '50%'}}></div>
            </div>
        
            <h1 style={{color: 'var(--black)', fontSize: '3rem'}}>Register</h1>
            <p className={globalStyles['small-font-size']}>Let's get a few important details out of the way!</p>
            <div className={`${formStyles['register-name']}`}>
                <div>
                    <Label style={{color: 'var(--black)'}} value='First Name'/>
                    <Input required ref={ passwordInput } type='text'/>
                </div>
                <div>
                    <Label style={{color: 'var(--black)'}} value='Last Name'/>
                    <Input ref={ passwordInput } type='text'/>
                </div>
            </div>
            <Label style={{color: 'var(--black)'}} value='Username'/>
            <Input required ref={ usernameInput } onChange={handleChangeUsername}/>
            <Label style={{color: 'var(--black)'}} value='Email'/>
            <Input onChange={handleChangeEmail} required ref={ emailInput } type='email'/>
            <Label style={{color: 'var(--black)'}} value='Password' />
            <Input required ref={ passwordInput } type='password'/>
            
            <div className={formStyles['buttons']}>
                <Button style={{backgroundColor: 'var(--black)'}} type='primary' value='Next' onClick={nextForm}/>
                <Button type='secondary' value='Cancel' onClick={(e) => {e.preventDefault(); navigate(-1)}}/>
            </div>
        </form>       

        <form className={`${formStyles['user-register-form']} ${formStyles['user-register-second-form']}`} ref={secondPage}>
            
            <div style={{display: 'flex', gap: '0.8vw', alignSelf: 'center', marginBottom: '1vh'}}>
                <div style={{width: '0.6vw', height: '0.6vw', border: '2px solid var(--lavender-40)', backgroundColor: 'var(--lavender-40)', borderRadius: '50%'}}></div>
                <div style={{width: '0.6vw', height: '0.6vw', border: '2px solid var(--lavender-40)', backgroundColor: 'var(--lavender-40)', borderRadius: '50%'}}></div>
            </div>

            <h1 style={{color: 'var(--black)', fontSize: '3rem'}}>Register</h1>
            <p className={globalStyles['small-font-size']}>Let's personalize our profile a bit!</p>

            <Label style={{color: 'var(--black)', alignSelf: 'center'}} value='Profile Picture'/>
            <p style={{alignSelf: 'center'}}><strong>Drag and drop or click to upload.</strong></p>
            <div className={formStyles['photo-input-preview']} onDrop={handleDrop} style={{backgroundImage: `url(${profilePicture})`, alignSelf: 'center'}}>
                <input className={`${formStyles['photo-input']}`} type='file' accept="image/jpeg, image/png, image/jpg" onChange={handleChange} />
            </div>

            <Label style={{color: 'var(--black)'}} value='Bio'/>
            <TextArea ref={ textAreaInput }  style={{width: '18.5vw', height: '10vh'}}/>

            <div className={formStyles['buttons']}>
                <Button style={{backgroundColor: 'var(--black)'}} type='primary' value='Register' onClick={register}/>
                <Button type='secondary' value='Cancel' onClick={(e) => {e.preventDefault(); navigate(-1)}}/>
            </div>
        </form>
        </>
    );

    function nextForm(e: MouseEvent) {
        e.preventDefault();

        const first = firstPage.current;

        if (!first?.checkValidity()) {
            return first?.reportValidity();
        }

        firstPage.current?.classList.remove(formStyles['user-register-active-page']);
        secondPage.current?.classList.add(formStyles['user-register-active-page']);
    }

    function register(e: MouseEvent) {
        e.preventDefault();

        const second = secondPage.current;

        if (!second?.checkValidity()) {
            return second?.reportValidity();
        }

        navigate(-1);
    }

    function handleChangeUsername() {
        const username = usernameInput.current;
        if (usernameExists(username!.value!)) {
            alert('Username exists! Choose another username.');
        }
    }

    function handleChangeEmail() {
        const email = emailInput.current;
        if (emailExists(email!.value!)) {
            alert('You already registered this email!');
        }
    }

    function handleDrop(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if(!file.type.match('image*')) return;
        
        setProfilePicture(URL.createObjectURL(file));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        if (e.target.files && e.target.files[0]) {
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        }
    }
}