import React, { Component } from "react";
import BackButton from "./back_button";

class UserScreen extends Component {
  render() {
    const { profileImage } = this.props.user;
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(profileImage.data))
    );
    console.log(`data:image/jpeg;base64,${base64String}`);
    return (
      <div>
        <div
          className="row"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <div className="profile">
            <BackButton
              handlebackbutton={this.props.handlebackbutton}
              data="displaybit"
            />
          </div>
        </div>
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <div className="row">
            <img
              className="userscreen-profile-photo"
              src={`data:image/jpeg;base64,${base64String}`}
            />
          </div>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <h6>Profile Image</h6>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <input style={{ display: "none" }} type="file" />
          <button
            className="btn btn-primary"
            style={{ fontSize: "0.8rem", marginLeft: "5px" }}
          >
            Change image
          </button>
        </div>
        <div className="container">
          <div
            className="row"
            style={{
              marginLeft: "25px",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            <h6>{`UserName:  ${this.props.user.name}`}</h6>
          </div>
          <div className="row" style={{ marginLeft: "25px" }}>
            <h6>{`Email Address:  ${this.props.user.email}`}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default UserScreen;
