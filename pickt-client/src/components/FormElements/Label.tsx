import React from 'react';
import styles from './FormElements.module.css'

type LabelProps = {
    value: string,
    forId?: string
}

export default function Label(props: LabelProps) {
    const {  forId, value } = props;
    return (
        <label className={styles['label']} htmlFor={ forId }>{ value }</label>
    );
}

