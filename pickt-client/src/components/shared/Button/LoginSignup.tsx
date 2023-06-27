import { Link } from "react-router-dom";
import Button from "./Button";
import React, { CSSProperties } from "react";

import buttonStyles from './Button.module.css'
import globalStyles from './../../../index.module.css'

type LoginSignupProperties = { 
    message?: string, 
    style?: CSSProperties 
};

export function LoginSignup(prop: LoginSignupProperties) {
    const { message, style } = prop;

    const loginSignupClass = [ 
        buttonStyles['login-signup'], 
        globalStyles['rounded-10px'], 
        globalStyles['small-font-size']
    ].join(' ');

    return (
        <div className={loginSignupClass} style={style}>

            <Link to='/user/login'>
                <Button value='Log In' type='primary' />
            </Link>

            { message !== undefined && 'or' }

            <Link to='/user/new'>
                <Button 
                    style={{backgroundColor: 'var(--black)'}} 
                    value='Register' 
                    type='secondary' 
                />
            </Link> 

            { message !== undefined && message }
        </div>
    );
}