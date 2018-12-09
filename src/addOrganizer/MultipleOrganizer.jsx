import React, { Component } from "react";
import CheckList from "../common/CheckList";
import "../shoppingList/ShoppingList.css";
import Alert from "react-s-alert";
import { addOrganizer } from "../util/APIUtils";
import Sidebar from "../event/Sidebar";
import SplitPane from "react-split-pane";
import { getEventDetails, updateEventDetails } from "../util/APIUtils";
import Bottombar from "../common/bottombar"

class MultipleOrganizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isSaved: false,

      event: {}
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentWillMount() {
    var event = {};
    event["eventId"] = this.props.match.params.eventId;

    getEventDetails(event).then(response => {
      var list = response.invitationList;
      var guestList = [];

      Object.entries(list).map(([id, value]) => {
        guestList.push({ text: id, key: id, isChecked: value });
      });

      this.setState({
        event: response,
        emailVenue: response.venue,
        emailDate: response.eventdate
      });
    });
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: this._inputElement.value,
        isChecked: false
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
      this._inputElement.value = "";
    }
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return item.key !== key;
    });

    this.setState({
      items: filteredItems
    });
  }

  handleCheckboxChange(key) {
    var filteredItems = this.state.items.filter(function(item) {
      if (item.key == key) {
        item.isChecked = !item.isChecked;
      }
      return true;
    });

    this.setState({
      items: filteredItems
    });
  }

  multipleOrganizer(e) {
    var email = {};
    var list = this.state.items;
    var emailList = [];
    list.map(l => {
      if (l.isChecked) emailList.push(l.text);
    });
    email["eventId"] = this.props.match.params.eventId;
    email["emailId"] = emailList;

    addOrganizer(email)
      .then(response => {
        Alert.success("Members added successfully");
      })
      .catch(error => {
        Alert.error("Some error in adding multiple organizer");
      });
  }

  handleChange = event => {
    this.setState({
      emailContent: event.target.value
    });
  };

  handleSubjectChange = event => {
    this.setState({
      emailSubject: event.target.value
    });
  };
  render() {
    return (
      <div style={{height:"900px"}}>
        <div className="childitemDiv">
          <div className="shoppingListMain">
            <div className="header2">
              <form onSubmit={this.addItem}>
                <input
                  type="email"
                  ref={a => (this._inputElement = a)}
                  placeholder="Enter email id"
                />
                <button type="submit">add</button>
              </form>
            </div>

            <div className="leftDiv">
              <CheckList
                entries={this.state.items}
                delete={this.deleteItem}
                handleCheckbox={this.handleCheckboxChange}
              />
            </div>

            <div className="header">
              <button onClick={e => this.multipleOrganizer(e)}>
                Add Organizer
              </button>
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

export default MultipleOrganizer;
