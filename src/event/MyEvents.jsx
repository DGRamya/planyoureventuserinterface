import React, { Component } from "react";
import Jumbotron from "../common/Jumbotron";
import { getMyEvents } from "../util/APIUtils";
import Alert from "react-s-alert";

class MyEvents extends Component {
  constructor(props) {
    super(props);
     this.state = {
      eventList : '',
      str: ''
    };
    this.state.str = [
      {"eventname":"Test Event","venue":"IMU"}, {"eventname":"Thanksgiving","venue":"IMU"}
     ];
     this.fetchEvents = this.fetchEvents.bind(this);
  }

componentDidMount() {
    this.fetchEvents();
}

 fetchEvents() {
  getMyEvents()
    .then(response => {
      console.log("response found :: " + JSON.stringify(response));
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
      <div>{
        this.state.str.map((event, i) => {
          return <Jumbotron parentMethod={this.fetchEvents} mainText={event.eventName}
          subText={event.venue}
          displayState="true" eventId = {event.eventId}/>
        })
      }
      </div>
    );
  }
}
 export default MyEvents;
