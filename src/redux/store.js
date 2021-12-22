import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id:1, message: "Hi, how are you?", likesCount: 12},
                {id:1, message: "I'm a superman", likesCount: 78},

            ],
            newPostText: "blabla"
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name:"Alex"},
                {id: 2, name:"Tom"},
                {id: 3, name:"Marry"},
                {id: 4, name:"Lisa"},
                {id: 5, name:"Kate"},
            ],
            messages: [
                {id: 1, message:'Hi'},
                {id: 2, message:"Buy"},
                {id: 3, message:"You so funny"},
                {id: 4, message:"Fuck you anyway"},
                {id: 5, message:"I love you"},
            ],
            newMessageBody: ''
        },
        sidebar: {},
    },
    _callSubscriber() {},
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPag = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};




export default store;
window.store = store;