import React, { Component } from "react";
import CheckList from "../common/CheckList";
import "../shoppingList/ShoppingList.css";
import Alert from "react-s-alert";
import Sidebar from "../event/Sidebar";
import SplitPane from "react-split-pane";
import { getEventDetails, updateEventDetails } from "../util/APIUtils";
import Bottombar from "../common/bottombar"

class TodoList extends Component{

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

        getEventDetails(event).then(response =>
        {
            var list = response.todoList;
            var todoList = [];
            console.log("todo list "+JSON.stringify(response));
            Object.entries(list).map(([id,value])=>{
                todoList.push({text: id, key: id, isChecked: value})
            })

            this.setState({event: response, items: todoList});
        })
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

        var newTodoList = {}
        list.map((l) => {
            newTodoList[l.text] = l.isChecked
        });

        newEvent["todoList"] = newTodoList;

        this.setState({
          isSaved: true,
        });

        updateEventDetails(newEvent).then(response =>
          {Alert.success("ToDo List saved successfully");}
        )
        .catch(error => {
          Alert.error("ToDo List not updated!!!");
        });
    }

    render() {
        return (
          <div style={{height:"900px"}}>
          <div className="childitemDiv">
          <div className="shoppingListMain">
            <div className="header2">
              <form onSubmit={this.addItem}>
                <input type = "text" ref={(a) => this._inputElement = a} placeholder="Enter Task">
                </input>
                <button type="submit">add</button>
              </form>
            </div>

              <div className="list">
              <CheckList entries={this.state.items}
                         delete={this.deleteItem}
                         handleCheckbox={this.handleCheckboxChange}/>
              </div>
              <div className="center">
               <button onClick={(e) => this.saveItem(e)}>Save</button>

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

export default TodoList;
