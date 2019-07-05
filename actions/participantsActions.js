import axios from 'axios'

export const ADD_NEW_PERSON_START = "ADD_NEW_PERSON_START"
export const ADD_NEW_PERSON_SUCCESS = "ADD_NEW_PERSON_SUCCESS"
export const ADD_NEW_PERSON_FAIL = "ADD_NEW_PERSON_FAIL"

export const VIEW_TRIP_PARTICIPANTS_START = "VIEW_TRIP_PARTICIPANTS_START"
export const VIEW_TRIP_PARTICIPANTS_SUCCESS = "VIEW_TRIP_PARTICIPANTS_SUCCESS"
export const VIEW_TRIP_PARTICIPANTS_FAIL = "VIEW_TRIP_PARTICIPANTS_FAIL"

export const SEND_CURRENT_PARTICIPANT_SUCCESS = "SEND_CURRENT_PARTICIPANT_SUCCESS"

const URL = 'https://trip-split-deploy2.herokuapp.com/'

export const viewTripParticipants =  (tripId) => dispatch => {
    dispatch({type: VIEW_TRIP_PARTICIPANTS_START});
    console.log('View Participants Start')
   return axios.get(`${URL}api/usertrips/participants/${tripId}`, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res =>{
        console.log('View Participants Success',res)
        dispatch({
            type: VIEW_TRIP_PARTICIPANTS_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => dispatch({
        type: VIEW_TRIP_PARTICIPANTS_FAIL,
        payload: err
    }))
}