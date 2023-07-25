import React, { MouseEvent, MouseEventHandler, useContext, useRef } from "react";
import { Input, Label } from "../shared/FormElements";
import Button from "../shared/Button/Button";

import formStyles from './Forms.module.css'
import { getUserAuthContext } from "../../hooks/useUserAuth";
import { emailExists, getUserByEmail, getUserByUsername, loginUser, usernameExists, validatePassword } from "../../services/user/UserServices";
import { useNavigate } from "react-router-dom";

export function UserLoginForm() {
    const usernameEmailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const formElement = useRef<HTMLFormElement>(null);

    const Context = getUserAuthContext();
    const userAuth = useContext(Context);
    const navigate = useNavigate();

    return(
        <form ref={formElement} className={formStyles['user-login-form']} style={{backdropFilter: `blur(20px)`}}>
            <h1 style={{color: 'var(--black)', fontSize: '3rem'}}>Login</h1>
            <Label style={{color: 'var(--black)'}} value='Username or Email'/>
            <Input required ref={ usernameEmailInput }/>
            <Label style={{color: 'var(--black)'}} value='Password'/>
            <Input required ref={ passwordInput } type='password'/>
            <div className={formStyles['buttons']}>
                <Button style={{backgroundColor: 'var(--black)'}} type='primary' value='Log in' onClick={login}/>
                <Button type='secondary' value='Cancel' onClick={() => {navigate('/')}}/>
            </div>
        </form>
    );

    async function login(e: MouseEvent) {
        e.preventDefault();

        const form = formElement.current;

        if (!form?.checkValidity()) {
            return form?.reportValidity();
        }
        
        const usernameEmail = usernameEmailInput.current?.value;
        const password = passwordInput.current?.value;
        const isUsername = await usernameExists(usernameEmail!);
        const isEmail = emailExists(usernameEmail!);
        
        console.log(isUsername);
        
        
        if (!isUsername && !isEmail) {
            return alert('The email or username does not exist.');
        }

        if (!await loginUser(usernameEmail!, password!)) {
            return alert('Your password is incorrect!');
        }
        
        const user = isUsername? await getUserByUsername(usernameEmail!): await getUserByEmail(usernameEmail!);
        userAuth?.setUser(user!);
        
        alert('Login Successful!');
        navigate(-1);
        
    }
}