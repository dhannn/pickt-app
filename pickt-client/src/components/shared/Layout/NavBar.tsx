import React, { useContext } from 'react';
import layoutStyles from './Layout.module.css';
import globalStyles from './../../../index.module.css';
import { Link } from 'react-router-dom';
import { Input } from '../FormElements';
import Avatar from '../Avatar/Avatar';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { LoginSignup } from '../Button/LoginSignup';
import { User } from '../../../types/User';

export function NavBar() {
    const Context = useUserAuth();
    const userAuth = useContext(Context);

    return (
        <div className={layoutStyles['navbar']}>
            <Link to={'/'} className={`${layoutStyles['site-name']}`}>Pickt</Link>
            <Link to={'/about'} className={`${layoutStyles['about-link']}`}>About</Link>
            <div className={`${layoutStyles['search-bar']}`}>
                <Input classNames={`${globalStyles['rounded-20px']}`} style={{width: '20vw'}}></Input>
            </div>

            { userAuth!.user === undefined? renderLoginSignup(): renderAvatar(userAuth?.user!) }
        </div>
    );

    function renderAvatar(user: User) {
        const { profilePictureURL, name, username } = user;

        return (
            <Link to={'/'}  style={{position: 'absolute', display: 'flex', right: '12vw', top: '1vh', color: 'var(--light-greenish-gray)'}}>
                <Avatar size={'smaller'} url={ profilePictureURL }/>
                <div>
                    <p style={{marginLeft: '1vw', marginTop: '0vh'}}>{`${name.firstName} ${name.lastName? name.lastName: ''}`}</p>
                    <p style={{marginLeft: '1vw', marginTop: '0vh', fontSize: '0.8rem'}}>{`@${username}`}</p>
                </div>
            </Link>
        );
    }

    function renderLoginSignup() {
        return (
            <LoginSignup style={{float: 'right', width: '12vw', backgroundColor: 'transparent', marginRight: '10vw'}}/>
        );
    }
}