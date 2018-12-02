import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import "./navBar.css";
library.add(faStroopwafel);

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "20px",
              width: "200%",
              background: "#2F363A",
              
              marginTop: "-24px",
              minheight: "100%"
            }}
          >
            <div className="sidebar-header">
              {/* <img
                className="rounded-circle"
                src={user.avatar}
                style={{ width: "100px", marginLeft: "25px" }}
              /> */}
              <p className="lead" align="center">
                <b>
                  {" "}
                  Welcome <br />
                </b>
              </p>
            </div>

            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href={"/eventdetails/"+this.props.eventId}  
                  style={{ color: "white" }}
                >
                  <i className="fas fa-home" />
                  &nbsp;Details
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="/shoppinglist"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-user-ninja" />
                  &nbsp;Shopping List
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/todolist"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-search" />
                  &nbsp;ToDo List
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/guestlist"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-envelope-square" />
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
const mapStateToProps = state => ({
  auth: state.auth
});

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
  // profile: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(Sidebar);