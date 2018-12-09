import React, { Component } from "react";
import ShoppingListItems from "./ShoppingListItems";
import Bottombar from "../common/bottombar";
import "./ShoppingList.css";
import SplitPane from "react-split-pane";
import {getShoppingSearch} from "../util/APIUtils"
import Alert from "react-s-alert";
import axios from "axios";
import SearchResults from "./SearchResult";
import Sidebar from "../event/Sidebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import  { getMyEventDetails } from "../appActions/eventsActions";


class ShoppingList extends Component{
  constructor(props) {
  super();
  this.state = {
  items: [],
  shoppingitems: [{},{},{},{},{}],
  isSearch: false,
  value: "Relevance",
  numItems: 10
};
  this.addItem = this.addItem.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
}

handleChange(event) {
    this.setState({value: event.target.value});
    console.log("drop down seleted", this.state.value);
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}

addItem(e) {
  if (this._inputElement.value !== "") {
    var newItem = {
      text: this._inputElement.value,
      key: Date.now()
    };

    this.setState((prevState) => {
      return {
        items: prevState.items.concat(newItem)
      };
    });
    this._inputElement.value = "";
  }
  e.preventDefault();
}

deleteItem(key) {
  var filteredItems = this.state.items.filter(function (item) {
    return (item.key !== key);
  });

  this.setState({
    items: filteredItems
  });
}

searchItem(e) {
  var shoppingData = {};

  shoppingData["item"] = this._inputElement.value;
  shoppingData["sort"] = this.state.value;
  shoppingData["numItems"] = this.state.numItems;
  console.log("searchItem method "+JSON.stringify(shoppingData));
  getShoppingSearch(shoppingData)
    .then(response => {
      console.log(response);
      this.setState({
        shoppingitems: response.items,
        isSearch: true
      });

      console.log(this.state.shoppingitems);
    })
    .catch(error => {
      Alert.error("Oops! Something went wrong. Please try again!");
    });

}
saveItem(e) {
  Alert.success("Shopping List saved successfully");
  this.setState({
    isSaved: true
  });

}

  render() {
    const { isSaved} = this.state.isSearch;
    console.log("In shoppinglist check 2" +  JSON.stringify(this.props.event));
    console.log("isSAved" + this.state.isSearch);
    return (

    <div style={{height:"900px"}}>
    <div className="childitemDiv">
    <div className="shoppingListMain">
      <div className="header">
          <input ref={(a) => this._inputElement = a} placeholder="Add an item.."></input>
          <button onClick={(e) => this.addItem(e)}>add</button>
          <button onClick={(e) => this.searchItem(e)}>search</button>
      </div>
      <div className="header1">
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="relevance">Relevance</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
            <option value="bestseller">Bestseller</option>
            <option value="customerRating">CustomerRating</option>
            <option value="new">New</option>
          </select>
          <label> Number of Items:
          <input name="numItems" type="number" value={this.state.numItems} onChange={this.handleInputChange} />
          </label>
      </div>
      <SplitPane split="vertical" defaultSize={500}>
        <SplitPane split="horizontal" defaultSize={500}>
          <div className="leftDiv">
            <h2 style={{color:"#FFF"}}>Shopping List</h2>
            <ShoppingListItems entries={this.state.items} delete={this.deleteItem}></ShoppingListItems>
          </div>
          <div style={{width:"200px", margin:"50%"}}>
            <button onClick={(e) => this.saveItem(e)}>Save</button>
          </div>
        </SplitPane>
        <div className="shoppingRightDiv">
          <div style={{color:"#FFF"}}><h2>Walmart Search</h2></div>
          {this.state.isSearch ? (
            <div style={{margin:"10%"}}>
            <SearchResults entries={this.state.shoppingitems}/>
            </div>
          ) : <div></div>}

        </div>
      </SplitPane>
    </div>
    <div className="bottomDiv">
      <Bottombar />
    </div>
    </div>

    </div>

    );
  }
}

export default ShoppingList;
