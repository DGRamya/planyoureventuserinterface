import React, { Component } from "react";
import ShoppingListItems from "./ShoppingListItems";
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
  isSaved: false,
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
  this.setState({
    isSaved: false
  });
  shoppingData["item"] = this._inputElement.value;
  shoppingData["sort"] = this.state.value;
  shoppingData["numItems"] = this.state.numItems;
  console.log("searchItem method "+JSON.stringify(shoppingData));
  getShoppingSearch(shoppingData)
    .then(response => {
      console.log(response);
      this.setState({
        shoppingitems: response.items
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
    const { isSaved} = this.state;
    console.log("In shoppinglist check 2" +  JSON.stringify(this.props.event));
    return (

  <div>
  <SplitPane split="vertical" defaultSize={200}>
      <div className="sidebarDiv">
       <Sidebar/>
      </div>
    <div className="rootDiv">
   { !isSaved ?
      <div className="childitemDiv">
      <div className="shoppingListMain">
        <div className="header">
            <input ref={(a) => this._inputElement = a} placeholder="Add an item.."></input>
            <button onClick={(e) => this.addItem(e)}>add</button>
            <button onClick={(e) => this.searchItem(e)}>search</button>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="relevance">Relevance</option>
              <option value="price">Price</option>
              <option value="title">Title</option>
              <option value="bestseller">Bestseller</option>
              <option value="customerRating">CustomerRating</option>
              <option value="new">New</option>
            </select>
            <input className="input1" name="numItems" type="number" value={this.state.numItems} onChange={this.handleInputChange} />
        </div>

        <SplitPane split="vertical" defaultSize={500}>
          <SplitPane split="horizontal" defaultSize={350}>
            <div>
              <h2>Shopping List</h2>
              <ShoppingListItems entries={this.state.items} delete={this.deleteItem}></ShoppingListItems>
            </div>
            <div className="header">
              <button onClick={(e) => this.saveItem(e)}>Save</button>
            </div>
          </SplitPane>
          <div>
            <SearchResults entries={this.state.shoppingitems}/>
          </div>
        </SplitPane>
     </div>
     </div>
   :
     <div className="childitemDiv">
     <div className="shoppingListMain">
        <div className="header">
           <input ref={(a) => this._inputElement = a} placeholder="Add an item.."></input>
           <button onClick={(e) => this.addItem(e)}>add</button>
           <button onClick={(e) => this.searchItem(e)}>search</button>
        </div>

        <SplitPane split="vertical" defaultSize={650}>
          <SplitPane split="horizontal" defaultSize={350}>
            <div>
              <h2>Shopping List</h2>
              <ShoppingListItems entries={this.state.items} delete={this.deleteItem}></ShoppingListItems>
            </div>
            <div className="header">
              <button onClick={(e) => this.saveItem(e)}>Save</button>
            </div>
          </SplitPane>
          <div>
            <h2>Walmart Search Results</h2>
          </div>
        </SplitPane>
    </div>
    </div>
   }
    </div>
    </SplitPane>
    </div>

    );
  }
}

export default ShoppingList;
