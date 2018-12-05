import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import SideButton from "./SideButton";
import "./navBar.css";
library.add(faStroopwafel);

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex", width: "180px"}}>
          <div style={{paddingLeft: "20px",
                       width: "180px",
                       background: "#2F363A",
                       height: "900px"}}>

              <SideButton buttonText="Details"
                             buttonLink={"/eventdetails/"+this.props.eventId}
                             style={{width: "50px"}}/>
              <SideButton buttonText="Shopping"
                             buttonLink={"/shoppinglist"}
                             style={{width: "50px"}}/>
              <SideButton buttonText="Invite"
                             buttonLink={"/inviteGuests"}
                             style={{width: "50px"}}/>

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
