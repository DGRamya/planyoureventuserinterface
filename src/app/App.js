import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { IndexRoute } from "react-router";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import ShoppingList from "../shoppingList/ShoppingList";
import InviteGuests from "../inviteGuests/InviteGuests";
import { getCurrentUser } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import PrivateRoute from "../common/PrivateRoute";
import Event from "../event/Event";
import EventDetails from "../event/EventDetails";
import Sidebar from "../event/Sidebar";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import MyEvents from "../event/MyEvents";


//redux changes
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import store from "../store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      currentUser: null,
      loading: false
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }


    return (
    <Provider store={store}>
      <div className="app" style={{backgroundImage: 'url(' + require('../img/b3.png') + ')'}}>
        <div className="app-top-box">
          <AppHeader
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
          />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            />

            <PrivateRoute
              path="/event"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Event}
            />

            <PrivateRoute
              path="/myevents"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={MyEvents}
            />

              <PrivateRoute
               path="/shoppingList"
               authenticated={this.state.authenticated}
               currentUser={this.state.currentUser}
               component={ShoppingList}
             />

             <PrivateRoute
              path="/inviteGuests"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={InviteGuests}
            />


           <PrivateRoute
              path="/eventdetails/:eventId"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={EventDetails}
            />

            <Route
              exact
              path="/login"
              render={props => (
                <Login authenticated={this.state.authenticated} {...props} />
              )}
            />

            <Route
              path="/signup"
              render={props => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            <Route component={NotFound} />

          </Switch>
        </div>
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </div>
    </Provider>
    );
  }
}

export default App;
