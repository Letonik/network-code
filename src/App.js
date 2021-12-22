import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter, Switch, Redirect} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
/*import ProfileContainer from "./components/Profile/ProfileContainer";*/
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";*/
const DialogsContainer = React.lazy(() => import( "./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import( "./components/Profile/ProfileContainer"));

class App extends React.Component {
    catchAllUnhandledError = (promiseRejectionEvent) => {
        alert('some error')
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledError)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledError)
    }


    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <Switch>
                    <div className='app-wrapper-content'>
                        <Route exact path='/'
                               render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>
                        <Route path='/users'
                               render={() => <UsersContainer/>}/>
                        <Route path='/login'
                               render={() => <Login/>}/>
                       {/* <Route path='*'
                               render={() => <div>404</div>}/>*/}
                    </div>
                </Switch>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

