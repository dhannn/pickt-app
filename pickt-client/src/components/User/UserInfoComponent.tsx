import React from "react";
import Avatar from "../shared/Avatar/Avatar";

import userStyles from './User.module.css';
import styles from './../../index.module.css';
import Button from "../shared/Button";

type UserInfoProps = {
    name: {
        firstName: string,
        lastName?: string
    }, 
    profilePictureURL: string,
    bio: string,
    username: string
}

export function UserInfoComponent(user: UserInfoProps) {
    const { profilePictureURL, name, username } = user;
    
    return (    
        <div className={`${userStyles['info-container']} ${styles['rounded-10px']}`}>
            <Avatar size='large' url={profilePictureURL}/>
            <h1 style={{color: 'var(--black)'}}>{name.firstName} {user.name.lastName === undefined? '': name.lastName}</h1>
            <h3 style={{color: 'var(--black)'}}>@{username}</h3>
            {user.bio? <p>{user.bio}</p>: <p><em>No bio here!</em></p>}
            
            <Button type='primary' value='See their portfolio' onClick={() => {}}/>
        </div>
    );
}