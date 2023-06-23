import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type InputProps = {
    type?: string
    classNames?: string
    style?: React.CSSProperties
    onFocus?: FocusEventHandler<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string
    required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (props: InputProps, ref) {
    const { classNames, type, style, onFocus, onChange, placeholder, required } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['input']} ${formStyles['formElements']}`;

    return (
        <input onBlur={onChange} ref={ref} required={required} className={ classNames + ' ' + css} type={type === undefined? 'text': type} style={style} onFocus={onFocus} placeholder={placeholder}></input>
    );
});

export default Input;
