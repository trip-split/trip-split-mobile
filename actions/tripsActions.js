import axios from 'axios'

export const GET_TRIPS_START = "GET_TRIPS_START"
export const GET_TRIPS_SUCCESS = "GET_TRIPS_SUCCESS"
export const GET_TRIPS_FAIL = "GET_TRIPS_FAIL"

export const GET_CURRENT_TRIP ="GET_CURRENT_TRIP"

export const ADD_TRIP_START = "ADD_TRIP_START"
export const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS"
export const ADD_TRIP_FAIL = "ADD_TRIP_FAIL"

export const END_TRIP_START = "END_TRIP_START"
export const END_TRIP_SUCCESS = "END_TRIP_SUCCESS"
export const END_TRIP_FAIL = "END_TRIP_FAIL"

const URL = 'https://trip-split-deploy2.herokuapp.com/'

export const getTrips = userId => dispatch => {
    dispatch({type: GET_TRIPS_START});

    axios.get(`${URL}api/usertrips/${userId}`, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res => {
        // console.log("Res.data.user.trip in action", res.data.user.trip);
         dispatch({
        
        type: GET_TRIPS_SUCCESS,
        payload: res.data.user.trip
        })
    })
    .catch(err => dispatch({
        type: GET_TRIPS_FAIL,
        payload: err
    }))
}

export const addTrip = (tripInfo, userId) => dispatch => {
    dispatch({type: ADD_TRIP_START});

   return axios.post(`${URL}api/trips`, tripInfo, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res => dispatch({
        type: ADD_TRIP_SUCCESS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: ADD_TRIP_FAIL,
        payload: err
    }))
}

export const endTrip =  (tripId) => dispatch => {
    dispatch({type: END_TRIP_START});

   return axios.put(`${URL}api/trips/${tripId}`, {isCurrent: 0}, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res => dispatch({
        type: END_TRIP_SUCCESS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: END_TRIP_FAIL,
        payload: err
    }))
}