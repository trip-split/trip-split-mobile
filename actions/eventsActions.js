import axios from 'axios'

export const ADD_NEW_EVENT_START = "ADD_NEW_EVENT_START"
export const ADD_NEW_EVENT_SUCCESS = "ADD_NEW_EVENT_SUCCESS"
export const ADD_NEW_EVENT_FAIL = "ADD_NEW_EVENT_FAIL"

export const GET_EVENTS_START = "GET_EVENTS_START"
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS"
export const GET_EVENTS_FAIL = "GET_EVENTS_FAIL"

const URL = 'https://trip-split-deploy2.herokuapp.com/'

export const addNewEvent = eventInfo => dispatch => {
    console.log("Add new event in actions fired", eventInfo)
    dispatch({type: ADD_NEW_EVENT_START})

    axios.post(`${URL}api/usertrips/add-event`, eventInfo, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res => dispatch({
        type: ADD_NEW_EVENT_SUCCESS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: ADD_NEW_EVENT_FAIL,
        payload: err
    }))
}

export const getEvents = tripId => dispatch => {
    console.log("Get events from actions ran")
    dispatch({type: GET_EVENTS_START});

    axios.get(`${URL}api/usertrips/events/${tripId}`, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res => {
        console.log("Events in action", res.data);
         dispatch({
            
        type: GET_EVENTS_SUCCESS,
        payload: res.data
        })
    })
    .catch(err => dispatch({
        type: GET_EVENTS_FAIL,
        payload: err
    }))
}