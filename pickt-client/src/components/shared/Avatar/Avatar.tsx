import React, { CSSProperties } from 'react';
import styles from './Avatar.module.css'

type AvatarSize = 'small' | 'medium' | 'large' | 'smaller'

type AvatarProps = {
    size: AvatarSize,
    url?: string,
    style?: CSSProperties
}

export default function Avatar(props: AvatarProps) {
    const {size, url, style} = props;
    const avatarStyle = `${styles.avatar} ${styles[size]}`;
    const defaultProfile = '/default_picture.png';

    return (
        <div className={avatarStyle} style={{...{backgroundImage: `url(${url? url: defaultProfile})`, ...style}}}/>
    );
}
