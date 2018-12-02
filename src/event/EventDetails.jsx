import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { getEventDetails } from "../util/APIUtils";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";
import  { getMyEventDetails } from "../appActions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./EventDetails.css";

class EventDetails extends Component {

    componentWillMount() {
        this.props.getMyEventDetails(this.props.match.params.eventId);
    }

    render() {
        console.log(this.props.event);
        return (
          <div className="root">
              { <div>
                 <Sidebar eventId={this.props.event.eventid}/>
              </div> }
              <div className="childitem title">
              {this.props.event.eventname}
              </div> <br />
              <div className="childitem content">
                  Event Venue : {this.props.event.venue} <br /><br />
                  {/* Description : {event.description} <br /><br /> <br /><br /> */}
              </div>
          </div>
        );
    }
}

//export default EventDetails;



EventDetails.propTypes = {
    getMyEventDetails: PropTypes.func.isRequired,
    event: PropTypes.array.isRequired
    //newEvent: PropTypes.object
  };
  
  const mapStatetoProps = state => ({
    event: state.events.event
    //newEvent: state.posts.item
  });
  
  export default connect(
    mapStatetoProps,
    { getMyEventDetails }
  )(EventDetails);