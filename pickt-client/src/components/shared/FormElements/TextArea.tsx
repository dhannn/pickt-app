import React, { forwardRef } from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type TextAreaProps = {
    classNames?: string
    style?: React.CSSProperties,
    required?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>( 
    function (props: TextAreaProps, ref) {
        const { classNames, style, required } = props;
        const css = `${globalStyles['rounded-5px']} ${formStyles['textarea']} ${formStyles['formElements']}`;

        return (
            <textarea ref={ref} required={required} className={css + ' ' + classNames} style={style}></textarea>
        );
    }
)

export default TextArea;

