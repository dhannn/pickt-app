import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type TextAreaProps = {
    classNames?: string
    style?: React.CSSProperties,
    required?: boolean,
    ref?: React.MutableRefObject<HTMLTextAreaElement>
}

export default function TextArea(props: TextAreaProps) {
    const { classNames, style, required, ref } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['textarea']} ${formStyles['formElements']}`;

    return (
        <textarea ref={ref} required={required} className={css + ' ' + classNames} style={style}></textarea>
    );
}

