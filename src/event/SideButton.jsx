import React, { Component } from "react";

class SideButton extends React.Component {
  render() {
    return (
      <div>
         <p><a className="btn btn-primary btn-lg" href={this.props.buttonLink}
          role="button" style={{backgroundColor:"#808080", border:"0px", color:"white"}}>
          {this.props.buttonText}</a></p>
        </div>
    )
  }
}

export default SideButton;