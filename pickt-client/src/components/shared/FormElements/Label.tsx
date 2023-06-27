import React from 'react';
import styles from './FormElements.module.css'

type LabelProps = {
    value: string,
    forId?: string
    style?: React.CSSProperties
    classNames?: string
}

export default function Label(props: LabelProps) {
    const {  forId, value, style, classNames } = props;
    const classes = `${styles['label']} ${classNames}`;
    return (
        <label className={ classes } htmlFor={ forId } style={ style }>{ value }</label>
    );
}
