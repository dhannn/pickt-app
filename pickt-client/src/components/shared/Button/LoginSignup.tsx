import { Link } from "react-router-dom";
import Button from "./Button";
import React, { CSSProperties } from "react";

import buttonStyles from './Button.module.css'
import globalStyles from './../../../index.module.css'

export function LoginSignup(prop: { message?: string, style?: CSSProperties }) {
    const { message, style } = prop;
    return (
        <div className={`${buttonStyles['login-signup']}  ${globalStyles['rounded-10px']}  ${globalStyles['small-font-size']}`} style={style}>
            <Link to='/user/login'>
                <Button value='Log In' type='primary' onClick={() => {}}></Button>
            </Link>
            { message !== undefined? 'or': '' }
            <Link to='/user/new'>
            <Button style={{backgroundColor: 'var(--black)'}} value='Register' type='secondary' onClick={() => {}}></Button>
            </Link> 
            { message !== undefined? message: ''}
        </div>
    );
}