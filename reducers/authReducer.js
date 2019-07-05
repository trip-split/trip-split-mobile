import {
    ADD_NEW_USER_START, 
    ADD_NEW_USER_SUCCESS, 
    ADD_NEW_USER_FAIL,
    GET_ALL_USERS,
    GET_ALL_USERS_FAIL
} from '../actions/index.js';

const initialState = {
    isFetching: false,  
    user: {},
    users: [],
    gotUsers: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_NEW_USER_START:
        //     return{
        //         ...state,
        //         isFetchingUser: true
        //     }
        case ADD_NEW_USER_SUCCESS:
            console.log("new user reducer ran")
            console.log("add new user reducer success",action.payload);
            return {
                ...state,
                user: {
                    authname: action.payload.authname,
                    id: action.payload.id,
                    username: action.payload.username,
                    thumbnail: action.payload.thumbnail
                },
                isFetchingUser: false
            }
        case ADD_NEW_USER_FAIL:
            // console.log("user probably already exists")
            console.log("action payload from failed reducer:", action.payload)
            return {
                ...state,
                fetchingUserError: action.payload,
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
        default:
            return state
    }
}