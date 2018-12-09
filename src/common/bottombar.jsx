import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

class Bottombar extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="headercontainer">
          <div className="app-options">
            <nav className="app-nav">
                <ul>
                  <li>
                    <NavLink to="/eventdetails">Event Details</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shoppinglist">Shopping List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/inviteGuests">Invitations</NavLink>
                  </li>
                  <li>
                    <NavLink to="/todoList">To Do</NavLink>
                  </li>
                  <li>
                    <NavLink to="/multipleOrganizer">Add Organizer</NavLink>
                  </li>
                </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Bottombar;
