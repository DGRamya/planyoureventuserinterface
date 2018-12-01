import React, { Component } from "react";
import Jumbotron from "../common/Jumbotron";
import { getMyEvents } from "../util/APIUtils";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvents } from "../appActions/eventsActions";

class MyEvents extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.props.events.map((event, i) => {
          return (
            <Jumbotron
              parentMethod={this.props.fetchEvents}
              mainText={event.eventname}
              subText={event.venue}
              displayState="true"
              eventId={event.eventId}
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
