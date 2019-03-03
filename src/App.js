import React, { Component } from "react";

// import axios from "axios";

import { Switch, Route } from "react-router-dom";
// import { Button } from "react-bootstrap";

import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Women from "./components/header/Women";
import Men from "./components/header/Men";
import Offers from "./components/Offers";
import HomePage from "./components/HomePage";
// import SignupForm from "./components/SignupForm";
// import LoginForm from "./components/LoginForm";
import LogOrSign from "./components/LogOrSign";

class App extends Component {
  constructor(props) {
    super(props);

    let userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
    this.state = { currentUser: userInfo };
  }
  updateUser(newUser) {
    if (newUser) {
      // save the user info in localStorage if we are login in4
      //( Turn it into a JSON string before we save)
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      // Delete the user info from localStorage if we are logging off
      localStorage.removeItem("currentUser");
    }

    this.setState({ currentUser: newUser });
  }

  // logoutClick() {
  //   // Logout to the backend
  //   getLogOut().then(response => {
  //     console.log("Log out", response.data);
  //     // set the currentUser state to empty
  //     this.updateUser(null);
  //   });
  // }

  render() {
    return (
      <header className="App-header">
        <Header />
        <Offers />
        {/* <HomePage /> */}

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/women" component={Women} />
          <Route path="/men" component={Men} />
          <Route path="/offers" component={Offers} />
          <Route
            path="/logOrSign"
            render={() => {
              return (
                <LogOrSign
                  currentUser={this.state.currentUser}
                  signupSuccess={user => this.updateUser(user)}
                  loginSuccess={user => this.updateUser(user)}
                />
              );
            }}
          />
        </Switch>

        <Footer />
      </header>
    );
  }
}

export default App;
