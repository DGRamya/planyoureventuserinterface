import React, { Component } from "react";
import Alert from "react-s-alert";
import "./SearchResult.css"

class SearchResults extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    var search = []
    for (let i = 0; i < 6; i++) {
        search.push(this.props.entries[i]);
    }
    console.log(search);
    return (
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
    )
  }
}

export default SearchResults;
