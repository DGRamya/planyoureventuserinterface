import React, { Component } from "react";
import Alert from "react-s-alert";
import "./Popup.css"

class Popup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <div>
          {this.props.entries.map((entry, index) =>
          <div className="thumbnail">
            <a href={entry.productUrl} target="_blank">
              <img src={entry["thumbnailImage"]}/>
            </a>
              <div className="caption">
                <h3>{entry["name"]}</h3>
                <p>{entry["salePrice"]}</p>
              </div>
          </div>
          )}
        </div>
        <div className="header">
          <button onClick={this.props.closePopup}>X</button>
        </div>
        </div>
      </div>
    );
  }
}

export default Popup;
