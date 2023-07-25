import React, { CSSProperties, useContext } from 'react';
import layoutStyles from './Layout.module.css';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { getUserAuthContext } from '../../../hooks/useUserAuth';
import { LoginSignup } from '../Button/LoginSignup';
import { User } from '../../../types/User';
import { SearchBar } from '../SearchBar/SearchBar';

export function NavBar() {
    const Context = getUserAuthContext();
    const userAuth = useContext(Context);
    
    return (
        <>
        <div className={layoutStyles['navbar']}>
            <Link to={'/'} className={`${layoutStyles['site-name']}`}>Pickt</Link>
            <Link to={'/about'} className={`${layoutStyles['about-link']}`}>About</Link>
            
            <SearchBar/>

            { userAuth!.user === undefined? renderLoginSignup(): renderAvatar(userAuth?.user!) }
        </div>
        </>
    );

    function renderAvatar(user: User) {
        const { profilePictureURI: profilePictureURL, fullName, username } = user;

        return (
            <Link to={`/user/@${ username }`} className={ layoutStyles['user-info-container'] }>
                <Avatar size={'smaller'} url={ profilePictureURL }/>
                <div>
                    <Link 
                        to={ `/user/@${username}` } 
                        className={ `${layoutStyles['user-info']} ${layoutStyles['user-info-name']}` }
                    >
                        {`${fullName.firstName} ${fullName.lastName? fullName.lastName: ''}`}
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
        const styles: CSSProperties = {
            float: 'right',
            width: '12vw',
            backgroundColor: 'transparent',
            marginRight: '10vw'
        };
        
        return (
            <LoginSignup style={styles}/>
        );
    }
}