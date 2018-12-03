import React, { Component } from "react";
import "../shoppingList/ShoppingList.css";

class GuestsList extends Component{
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
return <div className="theList2">
<li key={item.key}> {item.text} </li>
<button onClick={() => this.delete(item.key)} > delete </button>
              </div>
  }

  delete(key) {
   this.props.delete(key);
  }
  render() {
    var shoppingEntries = this.props.entries;
    var listItems = shoppingEntries.map(this.createTasks);
  return (
    <div className="theList"> {listItems} </div>
    );
  }
}

export default GuestsList;
