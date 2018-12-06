import React, { Component } from "react";

class SideButton extends React.Component {
  render() {
    return (
      <div>
         <p><a className="btn" href={this.props.buttonLink}
          role="button" style={{backgroundColor:"#808080", border:"0px", color:"white", width:"100%", height:"50px", font:"100px"}}>
          {this.props.buttonText}</a></p>
        </div>
    )
  }
}

export default SideButton;
