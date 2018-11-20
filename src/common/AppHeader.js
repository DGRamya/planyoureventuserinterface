import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

class AppHeader extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="container">
          <div className="app-branding">
            <Link to="/" className="app-title">
              Plan your Event
            </Link>
          </div>
          <div className="app-options">
            <nav className="app-nav">

              {this.props.authenticated ? (
                <ul>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <a onClick={this.props.onLogout}>Logout</a>
                  </li>
                  <li>
                    <NavLink to="/event">Create Event</NavLink>
                  </li>
                  <li>
                    <NavLink to="/myevents">My Events</NavLink>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                </ul>
              )}

            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
