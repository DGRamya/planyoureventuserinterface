import { FETCH_EVENTS } from "./types";
import { getMyEvents } from "../util/APIUtils";

export const fetchEvents = () => dispatch => {
  getMyEvents().then(response =>
    dispatch({
      type: FETCH_EVENTS,
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
