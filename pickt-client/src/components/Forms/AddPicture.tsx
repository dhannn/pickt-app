import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import formStyles from './Forms.module.css'

export function AddPicture({isFocused, setFocus}: { isFocused: boolean, setFocus: React.Dispatch<React.SetStateAction<boolean>>}) {
    let [ photo, setPhoto ] = useState<string | undefined>();
    
    return photo === undefined? renderDefaultView(): renderUploadedView();
    
    function renderDefaultView() {
        return (
            <div className={formStyles['photo-input-preview-create-post']}>
                <FontAwesomeIcon className={formStyles['add-photo-icon']} size='8x' icon={solid("image")}/>
                <p className={formStyles['add-photo-instruction']}>Drag and drop image or upload</p>
                <input type="file" className={formStyles['photo-input']} accept="image/jpeg, image/png, image/jpg" onChange={handleChange} />
            </div>
        );
    }

    function renderUploadedView() {
        return <div
            className={formStyles['photo-input-preview-create-post']}
            style={{ backgroundImage: `url(${photo})`, backgroundColor: `#373b4840` }}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className={formStyles['photo-input']}
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleChange} />
            <FontAwesomeIcon
                size='lg'
                className={`${formStyles['delete-add-picture']}`}
                icon={solid("square-xmark")}
                onClick={handleDelete} />
        </div>;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }         
    }

    function handleDelete() {
        setPhoto(undefined);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if(!file.type.match('image*')) return;
        setPhoto(URL.createObjectURL(file));
    }
}
