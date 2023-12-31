import React, { RefObject, forwardRef } from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type SelectProps = {
    choices: Array<string>,
    classNames?: string
    width?: number,
    style?: React.CSSProperties, 
    required?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    function (props: SelectProps, ref) {
        const { classNames, choices, style, required } = props;
        const css = `${globalStyles['rounded-5px']} ${formStyles['select']} ${formStyles['formElements']}`;

        const choiceElements = choices.map(renderChoice);

        return (
            <select 
                ref={ref} 
                required={required} 
                className={`${classNames} ${css}`} 
                style={style} 
                defaultValue=''
            >
                <option value='' selected disabled hidden> </option>
                { choiceElements }
            </select>
        );

        function renderChoice(choice: string) {
            return <option value={choice}>{choice}</option>;
        }
    }
);

export default Select;

