import React, { Component } from "react";
import GuestsList from "./GuestsList";
import "../shoppingList/ShoppingList.css";
import Alert from "react-s-alert";
import {sendInvite} from "../util/APIUtils"
import Sidebar from "../event/Sidebar";
import SplitPane from "react-split-pane";

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

       console.log(email);
      sendInvite(email)
        .then(response => {
          console.log(JSON.stringify(response));
        })
        .catch(error => {
          Alert.success(
              "Email Sent successfully"
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
      <div className="rootDiv">
      <div className="sidebarDiv">
       <Sidebar/>
      </div>
      <div className="childitemDiv">
      <div className="shoppingListMain">
        <div className="header2">
          <form onSubmit={this.addItem}>
            <input type = "email" ref={(a) => this._inputElement = a} placeholder="Enter email id">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <SplitPane split="vertical" defaultSize={750}>
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
          Send Customized Email Subject:
          </div>
          <div>
            <textarea placeholder="You are invited!" onChange={this.handleSubjectChange}>
            </textarea>
            {/* </textarea> */}
          </div>
          <div>
          Send Customized Email Content:
          </div>
          <div>
            <textarea style={{height:"200px"}} placeholder="You are invited!" onChange={this.handleChange} />
          </div>
        </div>
        </SplitPane>
      </div>
      </div>
      </div>
    );
  }
}

export default InviteGuests;
