import { FETCH_EVENTS, DELETE_EVENT_BY_EVENT_ID } from "./types";
import { getMyEvents } from "../util/APIUtils";
import { deleteEvent } from "../util/APIUtils";

export const fetchEvents = () => dispatch => {
  getMyEvents().then(response =>
    dispatch({
      type: FETCH_EVENTS,
      payload: response.events
    })
  );
};

export const deleteMyEvent = eventId => dispatch => {
  console.log("Inside reducer actions delete event");
  var event = {};
  event["eventId"] = eventId;

  deleteEvent(event).then(response =>
    dispatch({
      type: DELETE_EVENT_BY_EVENT_ID,
      payload: response.events
    })
  );
};

// export const createPost = postData => dispatch => {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify(postData)
//     })
//       .then(res => res.json())
//       .then(post =>
//         dispatch({
//           type: NEW_POST,
//           payload: post
//         })
//       );
//   };
