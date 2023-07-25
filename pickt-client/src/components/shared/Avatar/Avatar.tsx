import React, { CSSProperties } from 'react';
import styles from './Avatar.module.css'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AvatarSize = 'small' | 'medium' | 'large' | 'smaller'

type AvatarProps = {
    size: AvatarSize,
    url?: string,
    style?: CSSProperties
}

export default function Avatar(props: AvatarProps) {
    const { size, url, style } = props;
    const sizeClass = url? size: `default-${size}`;

    const avatarStyle = [
            styles['avatar'], 
            styles[sizeClass]
        ].join(' ');

    const defaultProfile = (
        <FontAwesomeIcon icon={solid("user")} className={avatarStyle}/>
    );

    console.log(url);
    if (!url) return defaultProfile;

    
    return (
        <div className={avatarStyle} style={{ backgroundImage: `url(${url})`, ...style}}/>
    );
}
