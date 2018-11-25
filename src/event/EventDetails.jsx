import React, { Component } from "react";
import ShoppingList from "./ShoppingList";
import Sidebar from "./Sidebar";

class EventDetails extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          fieldVal: "",
          itemname: "apple"
        }
    }

    onUpdate = (val) => {
        console.log("onUpdate -- parent");
        this.setState({
          fieldVal: val
        })
    };

    render() {
        return (
          <div>
              <div>
                  <Sidebar />
              </div>
              <div>
                   Event Details 
              </div>
             
          </div>
        );
    }
}

export default EventDetails;