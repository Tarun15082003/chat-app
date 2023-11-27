import React, { Component } from "react";

class Profile extends Component {
  state = {};
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.handleDisplayBit}>
        <i className="fa fa-user" aria-hidden="true"></i>
      </button>
    );
  }
}

export default Profile;
