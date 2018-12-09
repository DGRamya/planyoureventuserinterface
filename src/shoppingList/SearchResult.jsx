import React, { Component } from "react";
import Alert from "react-s-alert";
import "./SearchResult.css"
import Popup from "./Popup";
import SplitPane from "react-split-pane";

class SearchResults extends Component{
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
      <div>
        {this.props.entries.map((entry, index) =>
        index < 4 ?
        <div className="thumbnail">
          <a href={entry.productUrl} target="_blank">
            <img src={entry["thumbnailImage"]}/>
          </a>
            <div className="caption">
              <h3>{entry["name"]}</h3>
            </div>
            <div className="price">
              <h3>{entry["salePrice"]}</h3>
            </div>
        </div> : <div></div>
        )}

    </div>
    <div className="header">
      <button onClick={this.togglePopup.bind(this)}>Show More</button>
    </div>
    {this.state.showPopup ?
          <Popup
            entries={this.props.entries}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
    </div>
    )
  }
}

export default SearchResults;
