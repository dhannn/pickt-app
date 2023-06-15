import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../index.module.css'

type TextAreaProps = {
    classNames?: string
    height?: number
}

export default function TextArea(props: TextAreaProps) {
    const { classNames, height } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['textarea']} ${formStyles['formElements']}`;

    return (
        <textarea className={css + ' ' + classNames} style={{height: height?.toString() + 'vh'}}></textarea>
    );
}

