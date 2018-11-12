import React, { Component } from "react";
import PrimaryButton from "./PrimaryButton";
import "./Jumbotron.css";
import { HomeIcon, DeleteIcon} from "./ProjectIcons";
import { Link } from 'react-router-dom';

class Jumbotron extends Component {
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
              <DeleteIcon />
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
