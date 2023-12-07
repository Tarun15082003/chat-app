import React, { Component } from "react";
import avatar from "../images/user_image.jpg";

class Profile extends Component {
  state = {};
  render() {
    let user = this.props.user;
    let avatarSrc = user
      ? `http://localhost:3000/api/profileImages/${user.profileImage}`
      : avatar;
    return (
      <div className="row" style={{ alignContent: "baseline" }}>
        <img
          className="userscreen-profile-photo-small"
          src={avatarSrc}
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
