import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://proprikol.ru/wp-content/uploads/2020/02/kartinki-na-avatarku-dlya-parnej-i-muzhchin-1-1-650x583.jpg"
                alt="avatar"/>
            {props.message}
            <div><span>Like {props.likesCount}</span></div>
        </div>
    );
};

export default Post;