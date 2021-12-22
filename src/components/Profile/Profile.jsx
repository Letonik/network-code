import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile}
                         status={props.status} updateSatatus={props.updateStatus}
                         savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <div className={s.borderPost}>
                <MyPostsContainer/>
            </div>
        </div>
    )
}

export default Profile;