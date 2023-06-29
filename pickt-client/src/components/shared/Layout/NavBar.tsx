import React, { useContext } from 'react';
import layoutStyles from './Layout.module.css';
import globalStyles from './../../../index.module.css';
import { Link } from 'react-router-dom';
import { Input } from '../FormElements';
import Avatar from '../Avatar/Avatar';
import { getUserAuthContext } from '../../../hooks/useUserAuth';
import { LoginSignup } from '../Button/LoginSignup';
import { User } from '../../../types/User';
import { SearchBar } from '../SearchBar/SearchBar';

export function NavBar() {
    const Context = getUserAuthContext();
    const userAuth = useContext(Context);

    return (
        <div className={layoutStyles['navbar']}>
            <Link to={'/'} className={`${layoutStyles['site-name']}`}>Pickt</Link>
            <Link to={'/about'} className={`${layoutStyles['about-link']}`}>About</Link>
            
            <SearchBar/>

            { !userAuth!.user? renderLoginSignup(): renderAvatar(userAuth?.user!) }
        </div>
    );

    function renderAvatar(user: User) {
        const { profilePictureURL, name, username } = user;

        return (
            <Link to={`/user/@${ username }`} className={ layoutStyles['user-info-container'] }>
                <Avatar size={'smaller'} url={ profilePictureURL }/>
                <div>
                    <Link 
                        to={ `/user/@${username}` } 
                        className={ `${layoutStyles['user-info']} ${layoutStyles['user-info-name']}` }
                    >
                        {`${name.firstName} ${name.lastName? name.lastName: ''}`}
                    </Link>
                    <Link 
                        to={ `/user/@${username}` } 
                        className={ `${layoutStyles['user-info']} ${layoutStyles['user-info-username']}` } 
                    >
                        { `@${username}` }
                    </Link>
                </div>
            </Link>
        );
    }

    function renderLoginSignup() {
        return (
            <LoginSignup className={ layoutStyles['login-signup'] }/>
        );
    }
}