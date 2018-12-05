import React, { Component } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import axios from "axios";
import "react-day-picker/lib/style.css";
import "./Event.css";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import { createEvent } from "../util/APIUtils";
import Alert from "react-s-alert";
import  { createMyEvent } from "../appActions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventname: "",
      eventvenue: "",
      eventDate: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const eventDetails = {};
    for (const field in this.refs) {
      eventDetails[field] = this.refs[field].value;
    }

    var eventData = {};

    eventData["eventName"] = eventDetails["eventname"];
    eventData["venue"] = eventDetails["eventvenue"];
    eventData["eventDate"] = this.state.eventDate;

    console.log("printing the event data" + JSON.stringify(eventData));
    const eventRequest = Object.assign({}, eventData);

    // createEvent(eventRequest)
    //   .then(response => {
    //     Alert.success("Event created successfully!");
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     Alert.error("create event page Please try again!");
    //   });
    // event.target.reset();

    // call action
    //this.props.deleteMyEvent(this.props.eventId);
    this.props.createMyEvent(eventRequest);
    Alert.success("Event created successfully!");
  };

  handleDateChange(day) {
    this.setState({
      eventDate: day
    });
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div className="rootDiv">
        <div className="headerContainer">
          <div className="header">
            <label> Create Event </label>
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="child">
              <label>Event Name</label>
            </div>
            <div className="child">
              <input type="text" required ref="eventname" />
            </div>
          </div>

          <div className="container">
            <div className="child">
              <label>Event Venue</label>
            </div>
            <div className="child">
              <input type="text" required ref="eventvenue" />
            </div>
          </div>

          <div className="container">
            <div className="child">
              <label>Date</label>
            </div>
            <div className="child">
              <DayPickerInput onDayChange={this.handleDateChange} />
            </div>
          </div>

          <div className="container">
            <div className="submitButton">
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


Event.proptypes = {
  createMyEvent: PropTypes.func.isRequired
};

export default connect(
  null,
  { createMyEvent }
)(Event);
