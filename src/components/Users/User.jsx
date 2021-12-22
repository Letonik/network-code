import React from "react";
import s from './Users.module.css'
import st from './User.module.css'
import userPhoto from "../../assets/Images/ava.png";
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={st.user + ' ' + (user.followed ? st.bgUnfollow : st.bgFollow)}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={s.userPhoto} src={user.photos.small != null
                        ? user.photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div className={st.info}>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id);
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);
                        }}>Follow</button>}
                </div>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
        </div>
    )
}

export default User;