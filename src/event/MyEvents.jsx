import React, { Component } from "react";
import Jumbotron from "../common/Jumbotron";
import { getMyEvents } from "../util/APIUtils";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";
import EventDetails from "./EventDetails";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: "",
      str: ""
    };
    this.state.str = [
      { eventId:123, eventname: "Test Event", venue: "IMU" },
      { eventId:789, eventname: "Thanksgiving", venue: "IMU" }
    ];
    this.fetchEvents = this.fetchEvents.bind(this);

  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    getMyEvents()
      .then(response => {
        this.setState({
          str: response.events
        });
      })
      .catch(error => {
        Alert.error("Oops! Something went wrong. Please try again!");
      });
  }

  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.state.str.map((event, i) => {
          return (
             <Link to={"eventdetails/"+event.eventId} >     
            <Jumbotron
              parentMethod={this.fetchEvents}
              mainText={event.eventname}
              subText={event.venue}
              displayState="true"
              eventId={event.eventId} 
            />
            </Link>
          );
        })}
      </div>
    );
  }
}
export default MyEvents;
