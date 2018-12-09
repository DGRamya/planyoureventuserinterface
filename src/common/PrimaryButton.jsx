import React, { Component } from "react";

class PrimaryButton extends React.Component {
  render() {
    return (
      <div>
         <p><a className="btn btn-primary btn-lg" href={this.props.buttonLink}
          role="button" style={{backgroundColor:"#2F363A", border:"0px", color:"white"}}>
          {this.props.buttonText}</a></p>
        </div>
    )
  }
}

export default PrimaryButton;
