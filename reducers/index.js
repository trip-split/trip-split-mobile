import {REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL, 
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, 
    GET_TRIPS_START, GET_TRIPS_SUCCESS, GET_TRIPS_FAIL,
    ADD_TRIP_START, ADD_TRIP_SUCCESS, ADD_TRIP_FAIL,
    END_TRIP_START, END_TRIP_SUCCESS, END_TRIP_FAIL,
    ADD_NEW_PERSON_SUCCESS, ADD_NEW_PERSON_START, ADD_NEW_PERSON_FAIL, 
    VIEW_TRIP_PARTICIPANTS_START, VIEW_TRIP_PARTICIPANTS_SUCCESS, VIEW_TRIP_PARTICIPANTS_FAIL, 
    SEND_CURRENT_PARTICIPANT_SUCCESS, ADD_NEW_EVENT_START, ADD_NEW_EVENT_SUCCESS, ADD_NEW_EVENT_FAIL, GET_EVENTS_START, GET_EVENTS_SUCCESS, GET_EVENTS_FAIL
} from '../actions/index'

const initialState = {
    isFetching: false,
    isRegistering: false,
    isLoggingIn: false,
    isFetchingTrips: false,
    isAddingTrip: false,
    isEndingTrip: false,
    isAddingNewPerson: false,
    isFetchingTripParticipants: false,
    isAddingEvent: false,
    isFetchingEvents: false,
    
    userTrips: [],
    currentTrip: [],
    pastTrips: [],
    peopleOnTrip: [],
    user: {},
    fetchTripsError: '',
    currentParticipant: {}
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
            case REGISTER_START:
            return {
                ...state, 
                isRegistering: true
            }
        case REGISTER_SUCCESS:
            console.log("Register Success Payload: ", action.payload);
            // localStorage.setItem("jwt", action.payload.token)
            return {
                ...state,
                isRegistering: false
            }
        case REGISTER_FAIL:
            console.log("Register Failure payload: ", action.payload)
            return {
                ...state,
                isRegistering: false
            }
        case LOGIN_START:
            return {
                ...state,
                isLoggingIn: true
            }
        case LOGIN_SUCCESS:
            console.log("Login Success payload:", action.payload)
            localStorage.setItem("jwt", action.payload.token)
            localStorage.setItem("userId", action.payload.id)
            return {
                ...state,
                isLoggingIn: false,
                user: {
                    name: action.payload.username,
                    id: action.payload.id,
                    thumbnail: action.payload.thumbnail
                }
            }
        case LOGIN_FAIL:
            console.log("Login fail payload: ", action.payload)
            return {
                ...state,
                isLoggingIn: false
            }
        case GET_TRIPS_START:
        console.log("Get trips started...")
            return {
                ...state,
                isFetchingTrips: true
            }
        case GET_TRIPS_SUCCESS:
            console.log("Get trips success payload: ", action.payload);
            const currentTrip = action.payload.filter(currentTrip => {
                return currentTrip.isCurrent === true
            })
            console.log('Current Trip:', currentTrip)
            const pastTrips = action.payload.filter(currentTrip => {
                return currentTrip.isCurrent !== true
            })
            console.log("Reducer past Trip", pastTrips);
            return{
                ...state,
                isFetching: false,
                currentTrip: currentTrip,
                pastTrips: pastTrips
            }
        case GET_TRIPS_FAIL:
            console.log(action.payload)
            return {
                ...state, 
                isFetchingTrips: false,
                fetchTripsError: action.payload
            }
        case ADD_TRIP_START:
            return {
                ...state,
                isAddingTrip: true
            }
        case ADD_TRIP_SUCCESS:
        console.log(action.payload)
            return{
                ...state, 
                isAddingTrip: false
            
            }
        case ADD_TRIP_FAIL:
            console.log(action.payload)
            return {
                ...state,
                isAddingTrip: false
            }
        case END_TRIP_START:
            return{
                ...state,
                isEndingTrip: true
            }
            
        case END_TRIP_SUCCESS:
            console.log(action.payload);
            console.log(currentTrip);
            return{
                ...state,
                currentTrip: [],
                isEndingTrip: false
            }
        case END_TRIP_FAIL:
            console.log(action.payload);
            return {
                ...state,
                isEndingTrip: false
            }
        case ADD_NEW_PERSON_START:
            return {
                ...state,
                isAddingNewPerson: true
            }
        case ADD_NEW_PERSON_SUCCESS:
            return {
                ...state,
                isAddingNewPerson: false
            }
        case ADD_NEW_PERSON_FAIL:
            console.log(action.payload)
            return{
                ...state,
                isAddingNewPerson: false
            }
        case ADD_NEW_EVENT_START:
            return {
                ...state,
                isAddingEvent: true
            }
        case ADD_NEW_EVENT_SUCCESS:
            return {
                ...state,
                isAddingEvent: false
            }
        case ADD_NEW_EVENT_FAIL:
            console.log(action.payload)
            return{
                ...state,
                isAddingEvent: false
            }
        case GET_EVENTS_START:
            console.log("Get events started...")
                return {
                    ...state,
                    isFetchingTrips: true
                }
        case GET_EVENTS_SUCCESS:
            console.log("Get events success payload: ", action.payload);
        
                return{
                    ...state,
                    isFetchingEvents: false,
                    tripEvents: action.payload
                }
        case GET_EVENTS_FAIL:
            console.log(action.payload)
            return {
                ...state, 
                isFetchingEvents: false,
                fetchEventsError: action.payload
            }
        case VIEW_TRIP_PARTICIPANTS_START:
            return{
                ...state,
                isFetchingTripParticipants: true
            }
        case VIEW_TRIP_PARTICIPANTS_SUCCESS:
            console.log("viewing participants for trip")
            console.log(action.payload);
            return {
                ...state,
                peopleOnTrip: action.payload.trip,
                isFetchingTripParticipants: false
            }
        case VIEW_TRIP_PARTICIPANTS_FAIL:
            return {
                ...state,
                isFetchingTripParticipants: false
            }
        case SEND_CURRENT_PARTICIPANT_SUCCESS:
            console.log("Send current participant payload: ",action.payload.participant)
            return{
                ...state,
                currentParticipant: action.payload.participant
            }
         default:
        return state;

        }
    }

export default rootReducer