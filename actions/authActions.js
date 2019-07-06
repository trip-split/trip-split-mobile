import axios from 'axios'

export const ADD_NEW_USER_START = "ADD_NEW_USER_START"
export const ADD_NEW_USER_SUCCESS = "ADD_NEW_USER_SUCCESS"
export const ADD_NEW_USER_FAIL = "ADD_NEW_USER_FAIL"

export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL"

export const GET_USER_ID = "GET_USER_ID"
export const GET_USER_ID_FAIL = "GET_USER_ID_FAIL"

const URL = 'http://192.168.0.3:5000/'

export const addNewUser = data => dispatch => {
    axios.post(`${URL}api/users/new-user`, data)
    .then(res => {
         dispatch({
            type: ADD_NEW_USER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: ADD_NEW_USER_FAIL,
            payload: err
        })
    })
}
export const getAllUsers = () => dispatch => {
    axios.get(`${URL}api/users`)
    .then(res => {
         dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: err
        })
    })
}
export const getUserID = authname => dispatch => {
    console.log("getuserid action", authname)
    axios.get(`${URL}api/users/auth/${authname}`)
    .then(res => {
        console.log(res.data)
         dispatch({
            type: GET_USER_ID,
            payload: res.data
        })
    })
    .catch(err => {
        console.log("getuserid action failed", authname, err)
        dispatch({
            type: GET_USER_ID_FAIL,
            payload: err
        })
    })
}

