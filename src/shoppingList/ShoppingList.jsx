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
import { getEventDetails, updateEventDetails } from "../util/APIUtils";


class ShoppingList extends Component{
  constructor(props) {
  super();
  this.state = {
  items: [],
  shoppingitems: [{},{},{},{},{}],
  isSaved: false,
  value: "Relevance",
  numItems: 10,
  event: {}
};
  this.addItem = this.addItem.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
}

componentWillMount() {
  //getEventDetails(this.props.match.params.eventId);

  var event = {};
  event["eventId"] = this.props.match.params.eventId;

  getEventDetails(event).then(response =>
    {
      var list = response.shoppingList;
      var shopList = [];
      list.map((l) => shopList.push({text: l,
        key: Date.now()}));
    this.setState({event: response, items: shopList});
    console.log("event -- "+JSON.stringify(this.state.event));
    console.log("items -- "+JSON.stringify(this.state.items));}
  );

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
  console.log("new items  == "+this.state.items);
  var newEvent = this.state.event;
  var list = this.state.items;
  var shopList = [];
  list.map((l) => shopList.push(l.text));
  newEvent["shoppingList"] = shopList;
  console.log("newEvent  == "+newEvent);
  this.setState({
    isSaved: true, 
  });
  updateEventDetails(newEvent).then(response =>
    {
      Alert.success("Shopping List saved successfully");}
  )
  .catch(error => {
    Alert.error("Shopping List not updated!!!");
  });
}

  render() {
    const { isSaved} = this.state;
    console.log("In shoppinglist check 2" +  JSON.stringify(this.props.event));
    return (

  <div style={{backgroundImage:'url(' + require('../img/background3.jpg') + ')'}}>
  <SplitPane split="vertical" defaultSize={200}>
      <div className="sidebarDiv">
       <Sidebar eventId={this.props.match.params.eventId}/>
      </div>
    <div className="rootDiv">
   { !isSaved ?
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
          <SplitPane split="horizontal" defaultSize={300}>
            <div>
              <h2>Shopping List</h2>
              <ShoppingListItems entries={this.state.items} delete={this.deleteItem}></ShoppingListItems>
            </div>
            <div className="header">
              <button onClick={(e) => this.saveItem(e)}>Save</button>
            </div>
          </SplitPane>
          <div>
            <div><h2>Walmart Search</h2></div>
            <div>
            <SearchResults entries={this.state.shoppingitems}/>
            </div>
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
