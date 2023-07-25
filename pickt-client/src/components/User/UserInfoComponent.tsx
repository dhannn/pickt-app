import React, { ChangeEvent, DragEvent, EventHandler, useRef, useState } from "react";
import Avatar from "../shared/Avatar/Avatar";

import userStyles from './User.module.css';
import styles from './../../index.module.css';
import Button from "../shared/Button";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, TextArea } from "../shared/FormElements";
import { useUserAuth } from "../../hooks/useUserAuth";
import { deleteUser, editUserInfo, logoutUser } from "../../services/user/UserServices";
import { redirect, useNavigate } from "react-router-dom";
import { convertImageToBase64 } from "../../utils/uploadPhoto";

type UserInfoProps = {
    name: {
        firstName: string,
        lastName?: string
    }, 
    profilePictureURL: string,
    bio: string,
    username: string
}

type UserInfoState = 'display' | 'edit';

export function UserInfoComponent(user: UserInfoProps) {
    const { profilePictureURL, name, username } = user;
    const [ state, setState ] = useState<UserInfoState>('display');

    const userAuth = useUserAuth()!;
    const profilePictureRef = useRef<HTMLInputElement>(null);
    const [ profilePictureBase64, setProfilePictureBase64 ] = useState(profilePictureURL);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const bioRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    
    const isSignedUser = userAuth.user !== undefined && userAuth.user.username === user.username;
    return (    
        <div className={`${userStyles['info-container']} ${styles['rounded-10px']}`}>
            {
                state === 'display'?
                <>
                    {isSignedUser && <FontAwesomeIcon style={{cursor: 'hand', alignSelf: 'self-end', marginBottom: '1vh'}} icon={faPen} onClick={() => setState('edit')}/>}
                    <Avatar size='large' url={profilePictureURL}/>
                    <h1 style={{color: 'var(--black)'}}>{name.firstName} {user.name.lastName === undefined? '': name.lastName}</h1>
                    <h3 style={{color: 'var(--black)'}}>@{username}</h3>
                    {user.bio? <p>{user.bio}</p>: <p><em>No bio here!</em></p>}

                    {isSignedUser? <div>
                        
                        <Button type='primary' style={{}} value='Logout' onClick={logout}/>
                        <Button type='primary' style={{backgroundColor: 'darkred'}} value='Delete' onClick={() => {
                            logoutUser().then(() => {
                                navigate(-1);
                                deleteUser(username).then(() => window.location.reload())
                            });
                        }}/>
                        </div>
                        : ''}
                </>
                :
                <>                
                    
                <p style={{fontSize: '0.8rem'}}>Drag and drop or click to upload.</p>
                <div style={
                    {position: 'relative',
                    top: '2vh',
                    width: '8vw', 
                    height: '8vw', 
                    backgroundSize: 'cover', 
                    backgroundColor: '#373b4840', 
                    borderRadius: '10px',
                    backgroundImage: `url(${profilePictureBase64})`, alignSelf: 'center',
                    backgroundPosition: 'center'}} onDrop={handleDrop}>
                    <input style={{
                        
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0vh',
                        left: '0',
                        opacity: '0',
                        cursor: 'pointer'
                    }}type='file' accept="image/jpeg, image/png, image/jpg" onChange={handleChange} />
                </div>
                    <div style={{display: 'flex', width: '16vw', gap: '1vw', marginTop: '2vh'}}>
                        <Input style={{width: '50%'}} ref={firstnameRef} text={user.name.firstName}></Input>
                        <Input style={{width: '50%'}} ref={lastnameRef} text={user.name.lastName}></Input>
                    </div>
                    <div style={{display: 'flex', alignContent: 'center', gap: '1vw'}}>
                        <p>@</p>
                        <Input style={{}} ref={usernameRef} text={user.username}></Input>
                    </div>
                    <TextArea ref={bioRef}>{user.bio}</TextArea>
                
                    <div style={{display: 'flex', width: '16.5vw', marginTop: '-2.5vh'}}>
                        <Button type='primary' style={{alignSelf: 'self-start'}} onClick={handleEdit}>Edit</Button>
                        <Button type='secondary' style={{alignSelf: 'self-end'}} onClick={() => setState('display')}>Cancel</Button>
                    </div>
                </>
            }
        </div>
    );

    function logout(e: React.MouseEvent<HTMLButtonElement>) {
        logoutUser().then(
            () => {
                navigate('/');
                window.location.reload();
            }
        )
    }

    function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
        let modified: any = {};
        
        const bio = bioRef.current?.value.trim();
        const firstName = firstnameRef.current?.value.trim();
        const lastName = lastnameRef.current?.value.trim();
        const newUsername = usernameRef.current?.value.trim();

        modified.username = username;

        if (bio !== user.bio) {
            modified.bio = bio;
        }

        if (firstName !== user.name.firstName) {
            modified.fullName.firstName = firstName;
        }

        if (lastName !== user.name.lastName) {
            modified.fullName.lastName = lastName;
        }

        if (username !== user.username) {
            modified.newUsername = newUsername;
        }
        
        if (profilePictureURL !== profilePictureBase64) {
            modified.profilePictureURI = profilePictureBase64;
        }

        if (modified) {
            editUserInfo(modified);
        }
        
        setState('display');
        window.location.reload();
    }
    

    function handleDrop(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if(!file.type.match('image*')) return;
        
        // setProfilePictureBase64(URL.createObjectURL(file));
        convertImageToBase64(file)
            .then((dat) => {
                setProfilePictureBase64(dat);
            })
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        if (e.target.files && e.target.files[0]) {
            // setProfilePictureBase64(URL.createObjectURL(e.target.files[0]));
            convertImageToBase64(e.target.files[0])
                .then((dat) => {
                    setProfilePictureBase64(dat);
                })
            // convertImageToBase64(e.target.files[0]).then((dat) => console.log(dat));
        }
    }
}