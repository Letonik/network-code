import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormControl/FormControl";
import {required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "../Common/FormControl/FormControl.module.css";
import {createField} from "../Common/FormControl/FormControl";


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        {createField('Email', 'email', [required], Input)}
        {createField('Password', 'password', [required], Input, {type: 'password'})}
        {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, "remember me")}
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl &&  createField('Symbols from image', 'captcha', [required], Input)}
        {error && <div className={s.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);



