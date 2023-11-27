import React, { Component } from "react";
import * as authService from "../services/authService";

class Logout extends Component {
  handleLogout = () => {
    authService.logout();
    window.location = "/";
  };
  render() {
    return (
      <button className="btn btn-danger" onClick={this.handleLogout}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
      </button>
    );
  }
}

export default Logout;
