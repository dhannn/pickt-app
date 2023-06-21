import React from 'react';
import styles from './Avatar.module.css'

type AvatarSize = 'small' | 'medium' | 'large'

type AvatarProps = {
    size: AvatarSize,
    url?: string
}

export default function Avatar(props: AvatarProps) {
    const {size, url} = props;
    const avatarStyle = `${styles.avatar} ${styles[size]}`;
    const defaultProfile = '/default_picture.png';

    return (
        <div className={avatarStyle} style={{backgroundImage: `url(${url? url: defaultProfile})`}}/>
    );
}
