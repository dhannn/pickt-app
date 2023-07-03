import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import commentStyles from './../../Comment/Comment.module.css';
import { OptionComponent } from './OptionComponent';

type EditDeleteOptionProperties = {
    handleDelete: Function,
    handleEdit: Function
}

export function EditDeleteOption(props: EditDeleteOptionProperties) {
    const { handleDelete, handleEdit } = props;

    const options = [
        {
            name: 'Edit',
            icon: faPenToSquare,
            onClick: handleEdit
        },
        {
            name: 'Delete',
            icon: faDeleteLeft,
            onClick: handleDelete
        }
    ]

    return (
        <OptionComponent options={ options }/>
    );
}
