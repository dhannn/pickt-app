import React from 'react';
import postStyles from './Post.module.css';
import globalStyles from './../../index.module.css';

export function PostTag(props: { tag: string }) {
    return (
        <a className={ `${postStyles['tag']} ${globalStyles['rounded-5px']}` } href={`/filter/${ props.tag }`}>
            {props.tag}
        </a>
    );
}
