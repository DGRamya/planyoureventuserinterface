import { FETCH_EVENTS } from "../appActions/types";

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

    // case NEW_POST:
    //   return {
    //     ...state,
    //     item: action.payload
    //   };
    default:
      return state;
  }
}
