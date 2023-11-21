import React, { Component } from "react";

class Logout extends Component {
  state = {};
  render() {
    return (
      <button className="btn btn-danger">
        <i className="fa fa-sign-out" aria-hidden="true"></i>
      </button>
    );
  }
}

export default Logout;
