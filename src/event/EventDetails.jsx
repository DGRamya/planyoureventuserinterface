import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { getEventDetails } from "../util/APIUtils";
import Alert from "react-s-alert";
import { Link } from "react-router-dom";
import "./EventDetails.css";

class EventDetails extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          fieldVal: "",
          itemname: "apple",
          event: ""
        }

        this.state.event = {eventId: 123, eventname: "Thanksgiving", venue: "IMU", description: "",
                            shoplist: ["cake","turkey"]};
        this.gotoShoppingList = this.gotoShoppingList.bind(this);
    }

    componentDidMount() {
        this.fetchEvent();
    }
    
    fetchEvent() {
        getEventDetails(this.props.match.params.eventId)
          .then(response => {
            this.setState({
              event: response.event
            });
          })
          .catch(error => {
            Alert.error("Oops! Something went wrong. Please try again!");
          });
    }
    

    onUpdate = (val) => {
        console.log("onUpdate -- parent");
        this.setState({
          fieldVal: val
        })
    };

    gotoShoppingList() {
        console.log("gotoShoppingList");
    }

    render() {
        return (
          <div className="root">
              <div className="childitem title">
                  {this.state.event.eventname}
              </div> <br />
              <div className="childitem content">
                  Event Venue : {this.state.event.venue} <br /><br />
                  Description : {this.state.event.description} <br /><br /> <br /><br />
                  <Link to={"shoppinglist/"+this.state.event.shoplist} >Shopping List</Link>
                  {/* <button onClick={this.gotoShoppingList}>Shopping List</button> */}
              </div>
          </div>
        );
    }
}

export default EventDetails;