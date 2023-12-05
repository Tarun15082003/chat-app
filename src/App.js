import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeScreen from "./components/home_screen";
import LoginForm from "./components/login";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/protectedRoute";
import * as authService from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import VideoScreen from "./components/videoScreen";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <ProtectedRoute
              path="/chats/videocall/:id"
              render={(props) => (
                <VideoScreen {...props} user={this.state.user} />
              )}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/chats/:id"
              component={HomeScreen}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/chats/home"
              component={HomeScreen}
            ></ProtectedRoute>
            <Redirect from="/chats" exact to="/chats/home" />
            <Redirect from="/" exact to="/login" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
