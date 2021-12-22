import {profileAPI, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_PARENT_PAGE = "SET_PARENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_PARENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId:number
}
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId:number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageActionType = {
    type: typeof SET_PARENT_PAGE
    currentPage:number
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count:number
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean
    userId:number
}
export const followSuccess = (userId:number):FollowSuccessActionType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId:number):UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<UserType>):SetUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({type: SET_PARENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: any, userId:number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId:number) => {
    return async (dispatch:any) => {
       followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
    }
}
export const unfollow = (userId:number) => {
    return async (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess);
    }
}

export default usersReducer;

