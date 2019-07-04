import axios from 'axios'

export const ADD_NEW_USER_START = "ADD_NEW_USER_START"
export const ADD_NEW_USER_SUCCESS = "ADD_NEW_USER_SUCCESS"
export const ADD_NEW_USER_FAIL = "ADD_NEW_USER_FAIL"

const URL = 'https://trip-split-deploy2.herokuapp.com/'

export const addNewUser = data => dispatch => {
    console.log("addNewUser from actions ran")
    dispatch({type: ADD_NEW_USER_START});

    axios.post(`${URL}api/users/new-user`, data)
    .then(res => {
        console.log("Events in action", res.data);
         dispatch({
        type: ADD_NEW_USER_SUCCESS,
        payload: res.data
        })
    })
    .catch(err => {
        console.log("ADD_NEW_USER action button fail clicked")
        dispatch({
        type: ADD_NEW_USER_FAIL,
        payload: err
        })
    })
}