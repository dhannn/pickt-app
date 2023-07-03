import React from "react";
import Button from "../shared/Button";
import commentStyles from './Comment.module.css'

export function ContentComponent(props: { level: number, content: string }) {
    const { level, content } = props;

    return (
    <>
        <p className={`${commentStyles['content']}`} style={getCommentContentStyle()}>{content}</p>
    </>);

    
    function getCommentContentStyle() {
        const leftPadding = level * 2;
        const baseWidth = 24;

        return ({
            width: `${baseWidth - leftPadding}vw`
        });
    }
}