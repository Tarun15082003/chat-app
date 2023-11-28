import React, { Component } from "react";
import * as authService from "../services/authService";

class Logout extends Component {
  render() {
    return (
      <button className="btn btn-danger" onClick={this.props.onClick}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
      </button>
    );
  }
}

export default Logout;
