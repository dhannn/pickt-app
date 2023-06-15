import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../index.module.css'

type SelectProps = {
    choices: Array<string>,
    classNames?: string
    width?: number
}

export default function Input(props: SelectProps) {
    const { classNames, choices } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['select']} ${formStyles['formElements']}`;

    const choiceHtml = choices.map(renderChoice);

    return (
        <select className={classNames + ' ' + css} required defaultValue=''>
            <option value='' selected disabled hidden> </option>
            {choiceHtml}
        </select>
    );

    function renderChoice(choice: string) {
        return <option value={choice}>{choice}</option>;
    }
}

