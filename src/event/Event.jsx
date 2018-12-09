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

    this.props.createMyEvent(eventRequest);
    Alert.success("Event created successfully!");
    event.target.reset();
    this.setState({
      eventDate: ""
    });
  };

  handleDateChange(day) {
    this.setState({
      eventDate: day
    });
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div className="login-container">
        <div className="container">
          <h1 className="login-title">Create Event</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-item">
              <input
                type="text"
                name="eventName"
                ref="eventname"
                className="form-control"
                placeholder="Event Name"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                name="eventVenue"
                ref="eventvenue"
                className="form-control"
                placeholder="Event Venue"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                name="eventDesc"
                className="form-control"
                placeholder="Event Description"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-item">
              <DayPickerInput inputProps={{ style: { width: 200, height: 50 } }} onDayChange={this.handleDateChange} value={this.state.eventDate}/>
            </div>
            <div className="form-item">
              <button type="submit">
                Save
              </button>
            </div>
          </form>

        </div>
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
