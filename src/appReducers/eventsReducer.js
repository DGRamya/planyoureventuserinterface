import { FETCH_EVENTS, DELETE_EVENT_BY_EVENT_ID, CREATE_EVENT, GET_EVENT_DETAILS } from "../appActions/types";

const initialState = {
  events: [],
  event: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state, // return current state with the spread operator
        events: action.payload
      };

    case DELETE_EVENT_BY_EVENT_ID:
      return {
        ...state,
        events: action.payload
      };
     
    case CREATE_EVENT:
      return {
        ...state,
        event: action.payload
      } ;

    case GET_EVENT_DETAILS:
      return {
        ...state,
        event: action.payload
      };  

    default:
      return state;
  }
}
