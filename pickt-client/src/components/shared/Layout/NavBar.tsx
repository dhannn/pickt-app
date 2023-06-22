import React from 'react';
import layoutStyles from './Layout.module.css';
import globalStyles from './../../../index.module.css';
import { Link } from 'react-router-dom';
import { Input } from '../FormElements';
import Avatar from '../Avatar/Avatar';

export function NavBar() {
    return (
        <div className={layoutStyles['navbar']}>
            <Link to={'/'} className={`${layoutStyles['site-name']}`}>Pickt</Link>
            <Link to={'/about'} className={`${layoutStyles['about-link']}`}>About</Link>
            <div className={`${layoutStyles['search-bar']}`}>
                <Input classNames={`${globalStyles['rounded-20px']}`} style={{width: '20vw'}}></Input>
            </div>

            <Link to={'/'}  style={{position: 'absolute', display: 'flex', right: '12vw', top: '1vh', color: 'var(--light-greenish-gray)'}}>
                <Avatar size={'smaller'}/>
                <div>
                    <p style={{marginLeft: '1vw', marginTop: '0vh'}}>Daniel Ramos</p>
                    <p style={{marginLeft: '1vw', marginTop: '0vh', fontSize: '0.8rem'}}>@dhannn</p>
                </div>
            </Link>
        </div>
    );
}