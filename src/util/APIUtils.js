import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      console.log("back to react" + json);
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function createEvent(eventRequest) {
  return request({
    url: API_BASE_URL + "/events/myevents/create",
    method: "POST",
    body: JSON.stringify(eventRequest)
  });
}

export function getMyEvents() {
  return request({
    url: API_BASE_URL + "/events/myevents/",
    method: "GET"
  });
}

export function getShoppingSearch(item) {
  console.log("in request " + JSON.stringify(item));
  return request({
    url: API_BASE_URL + "/events/myevents/shopping/search",
    method: "POST",
    body: JSON.stringify(item)
  });
}

export function getEventDetails() {
  return request({
    url: API_BASE_URL + "/events/myevents/eventdetails/${eventId}",
    method: "GET"
  });
}

export function deleteEvent(deleteRequest) {
  console.log(" deleteRequest :: " + JSON.stringify(deleteRequest));
  return request({
    url: API_BASE_URL + "/events/myevents/delete",
    method: "POST",
    body: JSON.stringify(deleteRequest)
  });
}
