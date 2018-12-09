import React, { Component } from "react";
import ShoppingListItems from "./ShoppingListItems";
import Bottombar from "../common/bottombar";
import CheckList from "../common/CheckList";
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
  isSearch: false,
  value: "Relevance",
  numItems: 10,
  event: {}
};
  this.addItem = this.addItem.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

}

componentWillMount() {
  var event = {};
  event["eventId"] = this.props.match.params.eventId;
  console.log("this.props.match.params :: " + JSON.stringify(event));
  getEventDetails(event).then(response =>
  {
      var list = response.shoppingList;
      var shopList = [];
      Object.entries(list).map(([id,value])=>{
        shopList.push({text: id, key: id, isChecked: value})
      })

      this.setState({event: response, items: shopList});}
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
      key: this._inputElement.value,
      isChecked: false
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

handleCheckboxChange(key){
  var filteredItems = this.state.items.filter(function (item) {
    if(item.key == key){
      item.isChecked = !item.isChecked;
    }
    return true;
  });

  this.setState({
    items: filteredItems
  });
}

saveItem(e) {
  var newEvent = this.state.event;

  var list = this.state.items;
  var shopList = {};
  list.map((l) => {
    shopList[l.text] = l.isChecked
  });
  newEvent["shoppingList"] = shopList;

  this.setState({
    isSaved: true,
  });

  console.log("newEvent :: "+JSON.stringify(newEvent));
  updateEventDetails(newEvent).then(response =>
    {Alert.success("Shopping List saved successfully");}
  )
  .catch(error => {
    Alert.error("Shopping List not updated!!!");
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
        <SplitPane split="horizontal" defaultSize={170}>
          <div className="shoppingleftDiv">
            <h2 style={{color:"#FFF"}}>Shopping List</h2>
            <CheckList entries={this.state.items} delete={this.deleteItem}
            handleCheckbox={this.handleCheckboxChange}></CheckList>
          </div>
          <div style={{width:"200px", margin:"50%"}}>
            <button onClick={(e) => this.saveItem(e)}>Save</button>
          </div>
        </SplitPane>
        <div className="shoppingRightDiv">
          <div style={{color:"#FFF"}}><h2>Walmart Search</h2></div>
          {this.state.isSearch ? (
            <div>
            <SearchResults entries={this.state.shoppingitems}/>
            </div>
          ) : <div></div>}

        </div>
      </SplitPane>
    </div>
    <div className="bottomDiv">
      <Bottombar eventId={this.props.match.params.eventId}/>
    </div>
    </div>

    </div>

    );
  }
}

export default ShoppingList;
