import React, { Component } from "react";
import avatar from "../images/user_image.jpg";

class Profile extends Component {
  state = {};
  render() {
    let user = this.props.user;
    return (
      <div className="row" style={{ alignContent: "baseline" }}>
        <img
          className="userscreen-profile-photo-small"
          src={avatar}
          alt="Profile"
          style={{ marginLeft: "15px", cursor: "pointer" }}
          onClick={this.props.handleDisplayBit}
        />
        {user === undefined ? null : (
          <h6 className="col-md-auto">{user.name}</h6>
        )}
      </div>
    );
  }
}

export default Profile;
