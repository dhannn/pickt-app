import React from "react";
import commentStyles from './Comment.module.css'

export function DeletedComment({level}: {level: number}) {
    const leftValue = level * 2;

    return (
        <div className={commentStyles['comment']}  style={{width: `${25 - leftValue}vw`, left: `${leftValue + 5}vw`}}>
            <p style={{fontSize: 'var(--small-font-size)', color: 'var(--greenish-gray)'}}><em>The user deleted this comment.</em></p>
        </div>
    );
}