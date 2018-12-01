import { FETCH_EVENTS, DELETE_EVENT_BY_EVENT_ID } from "../appActions/types";

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
    default:
      return state;
  }
}
