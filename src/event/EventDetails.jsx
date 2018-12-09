import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { getEventDetails } from "../util/APIUtils";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";
import  { getMyEventDetails } from "../appActions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./EventDetails.css";
import Bottombar from "../common/bottombar"

class EventDetails extends Component {

    componentWillMount() {
        this.props.getMyEventDetails(this.props.match.params.eventId);
    }

    render() {
        return (
          <div className="root">
              <div className="eventDetailcontainer">
                  <div className="header"><h2>General Information</h2></div>
                  <div>
                  <label> Event Name :
                  <input type="text" value={this.props.event.eventname} style={{width: "300px", height: "50px", fontSize:"20px"}}/>
                  </label>
                  </div>
                  <div>
                  <label>Event Venue :
                  <input type="text" value={this.props.event.venue} style={{width: "300px", height: "50px", fontSize:"20px"}}/>
                  </label>
                  </div>
                  <div className="input1">
                  <label>Event Date :
                  <input type="text" value={this.props.event.eventdate} style={{width: "300px", height: "50px", fontSize:"20px"}}/>
                  </label>
                  </div>
                  <button type="submit" style={{width: "100px", height: "50px"}}>
                    Save
                  </button>
              </div>
              <div className="bottomDiv">
                <Bottombar eventId={this.props.match.params.eventId}/>
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
