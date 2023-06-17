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
    return (
        <label className={styles['label'] + ' ' + classNames} htmlFor={ forId } style={style}>{ value }</label>
    );
}

