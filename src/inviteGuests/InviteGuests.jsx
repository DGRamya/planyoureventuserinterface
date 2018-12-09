import React, { Component } from "react";
import CheckList from "../common/CheckList";
import "../shoppingList/ShoppingList.css";
import Alert from "react-s-alert";
import {sendInvite} from "../util/APIUtils"
import Sidebar from "../event/Sidebar";
import SplitPane from "react-split-pane";
import { getEventDetails, updateEventDetails } from "../util/APIUtils";
import Bottombar from "../common/bottombar"

class InviteGuests extends Component{
  constructor(props) {
  super(props);
  this.state = {
    items: [],
    isSaved: false,
    emailContent: '',
    emailSubject: '',
    emailVenue: '',
    emailDate: '',
    event: {},
  };
  this.addItem = this.addItem.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

}

componentWillMount() {

  var event = {};
  event["eventId"] = this.props.match.params.eventId;

  getEventDetails(event).then(response =>
  {
      var list = response.invitationList;
      var guestList = [];

      Object.entries(list).map(([id,value])=>{
        guestList.push({text: id, key: id, isChecked: value})
      })

      this.setState({event: response, items: guestList, emailVenue: response.venue, emailDate: response.eventdate});
    }
  )
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

  var newGuestList = {}
  list.map((l) => {
    newGuestList[l.text] = l.isChecked
  });
  newEvent["invitationList"] = newGuestList;

  this.setState({
    isSaved: true,
  });
  console.log('saving... :: ' + JSON.stringify(newEvent));
  updateEventDetails(newEvent).then(response =>
    {Alert.success("Invitation List saved successfully");}
  )
  .catch(error => {
    Alert.error("Invitation List not updated!!!");
  });
}

sendInvite(e) {
       var email = {};
       var list = this.state.items;
       var emailList = [];
       list.map((l) => {
        if(l.isChecked)
          emailList.push(l.text)
       });
       email["emailId"] = emailList;
       email["emailContent"] = this.state.emailContent;
       email["emailSubject"] = this.state.emailSubject;
       email["emailVenue"] = this.state.emailVenue;
       email["emailDate"] = this.state.emailDate;
      sendInvite(email)
        .then(response => {
          Alert.success(
              "Email Sent successfully"
          );
        })
        .catch(error => {
          Alert.error(
              "Email Sending Error"
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
      <div style={{height:"900px"}}>
      <div className="childitemDiv">
      <div className="shoppingListMain">
        <div className="header2">
          <form onSubmit={this.addItem}>
            <input type = "email" ref={(a) => this._inputElement = a} placeholder="Enter email id">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <div>
          <SplitPane split="vertical" defaultSize={500}>
          <div className="leftDiv">
          <CheckList entries={this.state.items}
          delete={this.deleteItem} handleCheckbox={this.handleCheckboxChange}/>
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
      <div className="bottomDiv">
        <Bottombar eventId={this.props.match.params.eventId}/>
      </div>
      </div>
      </div>
    );
  }
}

export default InviteGuests;
