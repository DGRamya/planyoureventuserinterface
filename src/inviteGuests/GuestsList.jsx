import React, { Component } from "react";
import "../shoppingList/ShoppingList.css";

class GuestsList extends Component{
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
return <tr><div className="theList2">
<td><input type="checkbox" checked = {item.isChecked} onChange = {this.handleCheckboxChange}/></td>
<td><li key={item.key}> {item.text} </li></td>
<td><button style = {{width:"100%"}} onClick={() => this.delete(item.key)} > delete </button></td>
              </div></tr>
  }

  delete(key) {
   this.props.delete(key);
  }
  handleCheckboxChange(event){

  }
  render() {
    var shoppingEntries = this.props.entries;
    var listItems = shoppingEntries.map(this.createTasks);
  return (
    <div className="theList"><table className="guestTable"> {listItems} </table></div>
    );
  }
}

export default GuestsList;
