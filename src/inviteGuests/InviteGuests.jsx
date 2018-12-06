import React, { Component } from "react";
import GuestsList from "./GuestsList";
import "../shoppingList/ShoppingList.css";
import Alert from "react-s-alert";
import {sendInvite} from "../util/APIUtils"
import Sidebar from "../event/Sidebar";

class InviteGuests extends Component{
  constructor(props) {
  super(props);
  this.state = {
  items: [],
  isSaved: false,
  emailContent: '',
  emailSubject: '',
};
  this.addItem = this.addItem.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
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
saveItem(e) {
  Alert.success("Shopping List saved successfully");
  this.setState({
    isSaved: true
  });

}
sendInvite(e) {
  console.log("sendInvite called ");
       var email = {};
       var list = this.state.items;
       var emailList = [];
       list.map((l) => emailList.push(l.text));
       email["emailId"] = emailList;
       email["emailContent"] = this.state.emailContent;
       email["emailSubject"] = this.state.emailSubject;

      sendInvite(email)
        .then(response => {
          Alert.success(response.message);
        })
        .catch(error => {
          Alert.error(
            (error && error.message) ||
              "Oops! Something went wrong in email sending. Please try again!"
          );
        });
  }

  handleChange = event => {
    this.setState({
       emailContent: event.target.value
     }
   );
  }

  handleSubjectChange = event => {
    this.setState({
       emailSubject: event.target.value
     }
   );
  }
  render() {
    return (
      <div>
       <div>
       <Sidebar/>
    </div>
      <div className="shoppingListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input type = "email" ref={(a) => this._inputElement = a} placeholder="Enter email id">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <div className="leftDiv">
          <GuestsList entries={this.state.items}
          delete={this.deleteItem}/>
          <div className="header">
           <button onClick={(e) => this.saveItem(e)}>Save</button>
           <button onClick={(e) => this.sendInvite(e)}>Send Invite</button>
         </div>
        </div>
        <div className="rightDiv">
          <div>
          Send customized email content:
            <textarea placeholder="You are invited!" onChange={this.handleChange}>
            </textarea>
          </div>
          <div>
          Send customized email subject:
            <textarea placeholder="You are invited!" onChange={this.handleSubjectChange}>
            </textarea>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default InviteGuests;
