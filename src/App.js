import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeScreen from "./components/home_screen";
import LoginForm from "./components/login";
import RegisterForm from "./components/registerForm";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/chats/:id" component={HomeScreen}></Route>
            <Route path="/chats/home" component={HomeScreen}></Route>
            <Redirect from="/chats" exact to="/chats/home" />
            <Redirect from="/" exact to="/chats/home" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
