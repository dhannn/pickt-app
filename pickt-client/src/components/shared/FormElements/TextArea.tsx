import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type TextAreaProps = {
    classNames?: string
    style?: React.CSSProperties,
    required?: boolean
}

export default function TextArea(props: TextAreaProps) {
    const { classNames, style, required } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['textarea']} ${formStyles['formElements']}`;

    return (
        <textarea required={required} className={css + ' ' + classNames} style={style}></textarea>
    );
}

