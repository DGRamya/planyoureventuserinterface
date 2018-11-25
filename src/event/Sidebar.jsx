import React, { Component } from "react";
import "./navBar.css";


class Sidebar extends Component {
  state = {};
  render() {
    const styles = {
      base: {
        ":hover": {
          color: "#ffffff",
          cursor: "pointer"
        }
      }
    };

   
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "20px",
              width: "200%",
              background: "white",
              marginLeft: "-15px",
              marginTop: "-24px",
              height: "180vh"
            }}
          >

            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="/"
                  style={{ color: "#f17070" }}
                >
                  <i class="fas fa-home" />
                  &nbsp; Details
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="/shoppinglist:itemname"
                  className="nav-link active"
                  style={{ color: "#f17070" }}
                >
                  <i class="fas fa-user-ninja" />
                  &nbsp;Shopping List
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/todolist"
                  className="nav-link active"
                  style={{ color: "#f17070" }}
                >
                  <i class="fas fa-search" />
                  &nbsp;ToDo List
                </a>
              </li>
              <li className="nav-item">
                  <a
                  href="/guestlist"
                  className="nav-link active"
                  style={{ color: "#f17070" }}
                  >
                  <i class="fas fa-envelope-square" />
                  &nbsp;Invitation List
                </a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}



export default Sidebar;