import React, { MouseEvent, MouseEventHandler, useContext, useRef } from "react";
import { Input, Label, TextArea } from "../shared/FormElements";
import Button from "../shared/Button/Button";

import formStyles from './Forms.module.css'
import { useUserAuth } from "../../hooks/useUserAuth";
import { emailExists, getUserByEmail, getUserByUsername, usernameExists, validatePassword } from "../../services/user/UserServices";
import { useNavigate } from "react-router-dom";

export function UserRegisterForm() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const textAreaInput = useRef<HTMLTextAreaElement>(null);
    const formElement = useRef<HTMLFormElement>(null);

    const Context = useUserAuth();
    const userAuth = useContext(Context);
    const navigate = useNavigate();
    

    return(
        <form ref={formElement} className={formStyles['user-register-form']} style={{backdropFilter: `blur(20px)`}}>
            <h1 style={{color: 'var(--black)', fontSize: '3rem'}}>Register</h1>
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
            {/* <Label style={{color: 'var(--black)'}} value='Bio'/> */}
            {/* <TextArea required ref={ textAreaInput }  style={{width: '18.5vw', height: '10vh'}}/> */}
            <div className={formStyles['buttons']}>
                <Button style={{backgroundColor: 'var(--black)'}} type='primary' value='Next' onClick={login}/>
                <Button type='secondary' value='Cancel' onClick={() => {}}/>
            </div>
        </form>
    );

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

    function login(e: MouseEvent) {
        e.preventDefault();

        // const form = formElement.current;

        // if (!form?.checkValidity()) {
        //     return form?.reportValidity();
        // }
        
        // const usernameEmail = usernameEmailInput.current?.value;
        // const password = passwordInput.current?.value;
        // const isUsername = usernameExists(usernameEmail!);
        // const isEmail = emailExists(usernameEmail!);
        
        // if (!isUsername && !isEmail) {
        //     return alert('The email or username does not exist.');
        // }

        // if (!validatePassword(usernameEmail!, password!)) {
        //     return alert('Your password is incorrect!');
        // }
        
        // const user = isUsername? getUserByUsername(usernameEmail!): getUserByEmail(usernameEmail!);
        // userAuth?.setUser(user!);
        
        // alert('Login Successful!');
        // navigate('/');
        
    }
}