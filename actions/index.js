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

export const ADD_NEW_PERSON_START = "ADD_NEW_PERSON_START"
export const ADD_NEW_PERSON_SUCCESS = "ADD_NEW_PERSON_SUCCESS"
export const ADD_NEW_PERSON_FAIL = "ADD_NEW_PERSON_FAIL"

export const VIEW_TRIP_PARTICIPANTS_START = "VIEW_TRIP_PARTICIPANTS_START"
export const VIEW_TRIP_PARTICIPANTS_SUCCESS = "VIEW_TRIP_PARTICIPANTS_SUCCESS"
export const VIEW_TRIP_PARTICIPANTS_FAIL = "VIEW_TRIP_PARTICIPANTS_FAIL"

export const ADD_NEW_EVENT_START = "ADD_NEW_EVENT_START"
export const ADD_NEW_EVENT_SUCCESS = "ADD_NEW_EVENT_SUCCESS"
export const ADD_NEW_EVENT_FAIL = "ADD_NEW_EVENT_FAIL"

export const GET_EVENTS_START = "GET_EVENTS_START"
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS"
export const GET_EVENTS_FAIL = "GET_EVENTS_FAIL"

export const ADD_NEW_USER_START = "ADD_NEW_USER_START"
export const ADD_NEW_USER_SUCCESS = "ADD_NEW_USER_SUCCESS"
export const ADD_NEW_USER_FAIL = "ADD_NEW_USER_FAIL"


export const SEND_CURRENT_PARTICIPANT_SUCCESS = "SEND_CURRENT_PARTICIPANT_SUCCESS"

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

export const addNewPerson = personInfo => dispatch => {
    // console.log("Add new person in actions fired")
    dispatch({type: ADD_NEW_PERSON_START})

    axios.post(`${URL}api/usertrips/add-participant`, personInfo, {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    })
    .then(res => dispatch({
        type: ADD_NEW_PERSON_SUCCESS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: ADD_NEW_PERSON_FAIL,
        payload: err
    }))

}

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

export const sendCurrentParticipantInfo = (participantInfo) => {
    console.log("Participant info in actions: ", participantInfo)
    return {
        type: SEND_CURRENT_PARTICIPANT_SUCCESS,
        payload: participantInfo
    }
}

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

export const addNewUser = data => dispatch => {
    console.log("addNewUser from actions ran")
    dispatch({type: GET_EVENTS_START});

    axios.get(`${URL}api/users/new-user`, data)
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