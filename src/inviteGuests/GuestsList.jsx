import React, { Component } from "react";
import "../shoppingList/ShoppingList.css";

class GuestsList extends Component{
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return <li onClick={() => this.delete(item.key)}
              key={item.key}>{item.text}</li>
  }

  delete(key) {
   this.props.delete(key);
  }
  render() {
    var shoppingEntries = this.props.entries;
    var listItems = shoppingEntries.map(this.createTasks);

    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
}

export default GuestsList;
