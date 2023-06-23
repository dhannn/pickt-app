import React, { CSSProperties, useEffect, useState } from "react";
import { NavBar } from "../components/shared/Layout/NavBar";
import { getRandomPhoto } from "../utils/photo";
import { UserRegisterForm } from "../components/Forms/UserRegisterForm";


export function Register() {
    const [ bg, setBg ] = useState('');
    useEffect(() => getRandomPhoto(setBg), []);

    const style: CSSProperties = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        backgroundColor: bg === ''? 'var(--white)': 'var(--greenish-gray)',
        backgroundBlendMode: 'screen',
        position: 'absolute',
        backgroundPosition: 'center',
        zIndex: -2,
        top: 0
    }


    return (
        <>
            <NavBar/>
            <UserRegisterForm/>
            <div style={style}>

            </div>
        </>
    )
}