import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/Images/ava.png";
import ProfileDataForm from "./ProfileDataForm";
import ProfileDataFormReduxForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateSatatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

    if(!profile) {
        return <Preloader />
    }
    const mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        )
    }

    return (
        <div>
            <div className={s.discriptionBlock}>
                <img src={(profile.photos.large) || userPhoto} />
                {isOwner && <input type={"file"} onChange={mainPhotoSelected}/>}
                <div  className={s.border}>
                    <ProfileStatusWithHooks status={status} updateStatus={updateSatatus}/>
                </div>
                {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData toEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, toEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={toEditMode}>edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                if (profile.contacts[key]) {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                }
            })}
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;