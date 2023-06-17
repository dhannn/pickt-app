import React from 'react';
import formStyles from './FormElements.module.css'
import globalStyles from './../../../index.module.css'

type SelectProps = {
    choices: Array<string>,
    classNames?: string
    width?: number,
    style?: React.CSSProperties
}

export default function Select(props: SelectProps) {
    const { classNames, choices, style } = props;
    const css = `${globalStyles['rounded-5px']} ${formStyles['select']} ${formStyles['formElements']}`;

    const choiceHtml = choices.map(renderChoice);

    return (
        <select className={classNames + ' ' + css} style={style} required defaultValue=''>
            <option value='' selected disabled hidden> </option>
            {choiceHtml}
        </select>
    );

    function renderChoice(choice: string) {
        return <option value={choice}>{choice}</option>;
    }
}

