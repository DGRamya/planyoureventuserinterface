import React, { Component } from "react";
import Jumbotron from "../common/Jumbotron";
import { getMyEvents } from "../util/APIUtils";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvents } from "../appActions/eventsActions";
import "./MyEvents.css";

class MyEvents extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <div className="MyEventscontainer">
        <h1 className="title">My Events</h1>
        {this.props.events.map((event, i) => {

          return (
            i % 2 == 0?
            <Jumbotron
              parentMethod={this.props.fetchEvents}
              mainText={event.eventName}
              subText={event.venue}
              displayState="true"
              eventId={event.eventId}
              image="true"
            />
            :
            <Jumbotron
              parentMethod={this.props.fetchEvents}
              mainText={event.eventName}
              subText={event.venue}
              displayState="true"
              eventId={event.eventId}
              image="false"
            />
          );
        })}
      </div>
    );
  }
}

MyEvents.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
  //newEvent: PropTypes.object
};

const mapStatetoProps = state => ({
  events: state.events.events
  //newEvent: state.posts.item
});

export default connect(
  mapStatetoProps,
  { fetchEvents }
)(MyEvents);
