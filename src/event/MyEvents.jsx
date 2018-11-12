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
  };   this.state.str = [
      {"eventname":"Test Event","venue":"IMU"}, {"eventname":"Thanksgiving","venue":"IMU"}

    ];
    console.log("json :: "+ JSON.stringify(this.state.str));
  this.handleClick = this.handleClick.bind(this);

}

componentDidMount() {
  getMyEvents()
    .then(response => {
      console.log("response found :: " + JSON.stringify(response));
      this.setState({
        str: response.events
      });
      // this.props.history.push("/");
    })
    .catch(error => {
      Alert.error("Oops! Something went wrong. Please try again!");
    });
    
}

 handleClick(e) {

    e.preventDefault();
   //  this.setState({
   //   // eventList : this.refs.data
   //   eventList: JSON.parse(str)
   // });
 };
  render() {
  return (
    <div>{
      this.state.str.map((event, i) => {
        return <Jumbotron mainText={event.eventName}
        subText={event.venue}
        displayState="true"/>
      })
    }
    </div>
  );
  }
}
 export default MyEvents;
