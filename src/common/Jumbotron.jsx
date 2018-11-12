import React, { Component } from "react";
import PrimaryButton from "./PrimaryButton";
import "./Jumbotron.css";
import { HomeIcon, DeleteIcon} from "./ProjectIcons";
import { Link } from 'react-router-dom';
import { deleteEvent } from "../util/APIUtils";
import Alert from "react-s-alert";

class Jumbotron extends Component {
  constructor(props){
    super(props);
   this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(){
    console.log("Delete called :: " + this.props.eventId);
    var event = {};
    event["eventId"] =  this.props.eventId;
    deleteEvent(event)
      .then(response => {
        this.props.parentMethod();
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  }
  render() {
  return (
        <div className="jumbotron">
        <div>
          <img src={this.props.image} style={{maxHeight:"40%",width: "70%" }}/>
        </div>
          <h1>{this.props.mainText}</h1>
          <p>{this.props.subText}</p>
          <PrimaryButton buttonText='Learn more' buttonLink={this.props.buttonLink}/>
          {this.props.displayState=="true" ? (
            <div className = "deleteIcon">
                  <button name="delete" onClick={this.handleDelete}>
                  </button>
            </div>
          ) : (
              null
          )
        }
        </div>
      );
  }
}
export default Jumbotron
