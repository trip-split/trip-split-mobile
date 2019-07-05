import axios from 'axios'

export const ADD_NEW_USER_START = "ADD_NEW_USER_START"
export const ADD_NEW_USER_SUCCESS = "ADD_NEW_USER_SUCCESS"
export const ADD_NEW_USER_FAIL = "ADD_NEW_USER_FAIL"

export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL"

const URL = 'http://localhost:5000/'

export const addNewUser = data => dispatch => {
    console.log("addNewUser from actions ran", data)
    // dispatch({type: ADD_NEW_USER_START});

    axios.post(`${URL}api/users/new-user`, data)
    .then(res => {
        console.log("Events in action", res.data);
         dispatch({
            type: ADD_NEW_USER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log("add new user action failed,", err, data)
        dispatch({
            type: ADD_NEW_USER_FAIL,
            payload: err
        })
    })
}
export const getAllUsers = () => dispatch => {
    console.log("just trying to get users")
    // dispatch({type: ADD_NEW_USER_START});

    axios.get(`${URL}api/users`)
    .then(res => {
        console.log("was able to get users", res.data);
         dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log("get users failed,", err)
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: err
        })
    })
}

// export function addNewUser(data) {
//     console.log("addNewUser from actions ran", data)
    
//     return async (dispatch) => {
//         try {
//             const res = await axios.post(`${URL}api/users/new-user`, data)
//             console.log('user successfully added', data)
//             dispatch({
//                 type: ADD_NEW_USER_SUCCESS,
//                 payload: res.data
//             });
//         }  catch (error) {
//             console.error('something went wrong', error, data);
//             dispatch({
//                 type: ADD_NEW_USER_FAIL,
//                 payload: error
//             });
//         }
//     };
// }