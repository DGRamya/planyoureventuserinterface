import React, { Component } from "react";
import ShoppingListItems from "./ShoppingListItems";
import "./ShoppingList.css";
import SplitPane from "react-split-pane";
import {getShoppingSearch} from "../util/APIUtils"
import Alert from "react-s-alert";
import axios from "axios";
import SearchResults from "./SearchResult";


class ShoppingList extends Component{
  constructor(props) {
  super(props);
  this.state = {
  items: [],
  shoppingitems: [{},{},{},{},{}],
  isSaved: false,
  showModal: false,
};
  this.addItem = this.addItem.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
}

handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
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
  console.log("searchItem method "+shoppingData);
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
    const { showModal} = this.state.showModal;
    return (

  <div>
   {!isSaved ? (
      <div className="shoppingListMain">
        <div className="header">
            <input ref={(a) => this._inputElement = a} placeholder="Add an item..">
            </input>
            <button onClick={(e) => this.addItem(e)}>add</button>
            <button onClick={(e) => this.searchItem(e)}>search</button>
            <button onClick={() => this.handleToggleModal()}>search</button>
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
        <SearchResults entries={this.state.shoppingitems}/>
     </div>
     </SplitPane>
     </div>
   ):(
     <div className="shoppingListMain">
       <div className="header">
           <input ref={(a) => this._inputElement = a} placeholder="Add an item..">
           </input>
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
   )}
    </div>
    );
  }
}

export default ShoppingList;
