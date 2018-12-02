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
      <SplitPane split="horizontal" defaultSize={600}>
      <div>
        {this.props.entries.map((entry, index) =>
        index < 8 ?
        <div className="thumbnail">
          <a href={entry.productUrl} target="_blank">
            <img src={entry["thumbnailImage"]}/>
          </a>
            <div className="caption">
              <h3>{entry["name"]}</h3>
              <p>{entry["salePrice"]}</p>
            </div>
        </div> : <div></div>
        )}

    </div>
    <div className="header">
      <button onClick={this.togglePopup.bind(this)}>Show More</button>
    </div>
    </SplitPane>
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
