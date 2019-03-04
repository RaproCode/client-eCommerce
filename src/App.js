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
import NotFound from "./components/NotFound";
// import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";

import { getProductList } from "./api.js";

class App extends Component {
  constructor(props) {
    super(props);

    let userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
    this.state = {
      currentUser: userInfo,
      productArray: []
    };
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

  componentDidMount() {
    getProductList().then(response => {
      console.log("Product List", response.data);

      this.setState({ productArray: response.data });
    });
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
    console.log(this.state, "hello");
    return (
      <header className="App-header">
        <div>
          <Header />
        </div>
        <div>
          <Offers />
        </div>

        {/* <ProductDetail /> */}
        {/* <ProductList /> */}

        {/* <HomePage /> */}

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/women" component={Women} />
          <Route path="/men" component={Men} />
          <Route path="/offers" component={Offers} />
          <Route
            path="/product"
            render={() => {
              return <ProductList productArray={this.state.productArray} />;
            }}
          />

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

          {/* <Route path="/product/detail" component={ProductDetail} /> */}

          <Route component={NotFound} />
        </Switch>

        <Footer />
      </header>
    );
  }
}

export default App;
