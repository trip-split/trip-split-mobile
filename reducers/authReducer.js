import {
    ADD_NEW_USER_START, 
    ADD_NEW_USER_SUCCESS, 
    ADD_NEW_USER_FAIL,
    GET_ALL_USERS,
    GET_ALL_USERS_FAIL,
    GET_USER_ID,
    GET_USER_ID_FAIL
} from '../actions/index.js';

const initialState = {
    isFetching: false,  
    user: "",
    user_id: ""
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case ADD_NEW_USER_SUCCESS:
            console.log("new user reducer ran")
            console.log("add new user reducer success, action.payload:", action.payload);
            return {
                ...state,
                user: action.payload,
                isFetchingUser: false
            }
        case ADD_NEW_USER_FAIL:
            // console.log("user probably already exists")
            console.log("action payload from failed reducer:", action.payload)
            return {
                ...state,
                isFetchingUser: false,
            }
        
        case GET_ALL_USERS:
            console.log("get users reducer success")
            return {
                ...state,
                gotUsers: true
            }
        case GET_ALL_USERS_FAIL:
            console.log("get users reducer failed")
            return {
                ...state,
                gotUsers: false
            }
        case GET_USER_ID:
            console.log("get user id reducer success", action.payload.id)
            return {
                ...state,
                user_id: action.payload.id
            }
        case GET_USER_ID_FAIL:
            console.log("get user id reducer fail")
            return {
                ...state,
                user_id: "failed"
            }
        default:
            return state
    }
}