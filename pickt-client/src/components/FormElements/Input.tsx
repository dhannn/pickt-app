import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../index.module.css'

type InputProps = {
    type?: string
    classNames?: string
    style?: React.CSSProperties
}

export default function Input(props: InputProps) {
    const { classNames, type, style } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['input']} ${formStyles['formElements']}`;

    return (
        <input className={ classNames + ' ' + css} type={type === undefined? 'text': type} style={style}></input>
    );
}

