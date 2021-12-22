import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Textarea} from "../../Common/FormControl/FormControl";

const maxLength10 =  maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]}
                   placeholder={"Post message"}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

let AddNewPostFormRedux = reduxForm ({form: "ProfileAddNewPostForm"}) (AddNewPostForm)

const MyPosts = React.memo(props => {

    let postsElements = props.posts.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef();

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postBlock}>
            <div className={s.forms}>
                <h3>My post</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
});


export default MyPosts;