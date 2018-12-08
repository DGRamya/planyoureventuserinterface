import React, { Component } from "react";
import CheckList from "../common/CheckList";
import "../shoppingList/ShoppingList.css";
import Alert from "react-s-alert";
import Sidebar from "../event/Sidebar";
import SplitPane from "react-split-pane";
import { getEventDetails, updateEventDetails } from "../util/APIUtils";

class TodoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isSaved: false,
          event: {},
          todoList: [],
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
      
            Object.entries(list).map(([id,value])=>{
                todoList.push({text: id, key: id, isChecked: value})
            })
      
            this.setState({event: response, items: todoList, todoList:todoList});
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
      
        var todoList = [];
        var newTodoList = {}
        list.map((l) => {
            newTodoList[l.text] = l.isChecked
            todoList.push(l.text)
        });
        
        newEvent["todolist"] = newTodoList;
      
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
          <div className="rootDiv">
          <div className="sidebarDiv">
           <Sidebar eventId={this.props.match.params.eventId}/>
          </div>
          <div className="childitemDiv">
          <div className="shoppingListMain">
            <div className="header2">
              <form onSubmit={this.addItem}>
                <input type = "text" ref={(a) => this._inputElement = a} placeholder="Enter Task">
                </input>
                <button type="submit">add</button>
              </form>
            </div>
            <SplitPane split="vertical" defaultSize={750}>
              <div className="leftDiv">
              <CheckList entries={this.state.items}
                         delete={this.deleteItem} 
                         handleCheckbox={this.handleCheckboxChange}/>
              <div className="header">
               <button onClick={(e) => this.saveItem(e)}>Save</button>
              </div>
              </div>
            </SplitPane>
          </div>
          </div>
          </div>
        );
    }


}

export default TodoList;