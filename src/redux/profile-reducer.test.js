import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import {render, screen} from "@testing-library/react";
import App from "../App";
import React from "react";

let state = {
    posts: [
        {id: 0, message: "Hi, how are you?", likesCount: 12},
        {id: 1, message: "I'm a superman", likesCount: 78},
    ],
    profile: null,
    status: ''
};

test('length of posts should be incremented', () => {
    //1. test data
    let action = addPostActionCreator("new text")
    //2. action
    let newState = profileReducer(state,action)

    //3. expectation
    expect (newState.posts.length).toBe(3)
    expect (newState.posts[2].message).toBe("new text")
});
test('after deleting length of message should be incremented', () => {
    //1. test data
    let action = deletePost(0)
    //2. action
    let newState = profileReducer(state,action)

    //3. expectation
    expect (newState.posts.length).toBe(1)
});
