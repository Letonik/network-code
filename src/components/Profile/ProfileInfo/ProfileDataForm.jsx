import React from 'react';
import {createField, Input, Textarea} from "../../Common/FormControl/FormControl"
import {reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validator";
import s from "../../Common/FormControl/FormControl.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button onClick={() => {}}>save</button></div>
            <div>
                <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField("","LookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>:
                {createField("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}</b>: {createField(key, "contacts." + key, [], Input)}
                    </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;