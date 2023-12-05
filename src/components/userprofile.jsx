import React, { Component } from "react";
import BackButton from "./back_button";
import avatar from "../images/user_image.jpg";

class UserScreen extends Component {
  state = {
    profilePicture: null,
    Username: null,
    Email: null,
  };

  componentDidMount() {
    const Username = this.props.user.name;
    const Email = this.props.user.email;
    const profilePicture = this.props.user.profileImage;
    this.setState({ Username, Email });
  }

  handleChange = (Username) => {
    this.setState({ Username });
  };

  handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    this.setState({ profilePicture: base64 });
  };

  handleUpdate = () => {
    const data = this.state;
    this.props.onUpdate(data);
  };

  render() {
    const { profilePicture } = this.state;
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
            <label htmlFor="image-upload" className="custom-file-upload">
              <img
                className="userscreen-profile-photo"
                src={profilePicture || avatar}
                alt="Profile"
              />
            </label>
            <input
              type="file"
              label="Image"
              name="myFile"
              id="image-upload"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={(e) => {
                this.handleImageChange(e);
              }}
            />
          </div>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <h6>Profile Image</h6>
        </div>
        <div className="container">
          <div
            className="row"
            style={{
              marginLeft: "25px",
              marginTop: "30px",
              marginBottom: "10px",
              justifyContent: "flex-start",
            }}
          >
            <div className="row">
              <h6>{"UserName:"}</h6>
              <input
                type="text"
                style={{ marginLeft: "5px" }}
                value={this.state.Username}
                onChange={(e) => {
                  this.handleChange(e.currentTarget.value);
                }}
              />
            </div>
          </div>
          <div
            className="row"
            style={{
              marginLeft: "25px",
              marginBottom: "10px",
              justifyContent: "flex-start",
            }}
          >
            <div className="row">
              <h6>{`Email Address:`}</h6>
              <input
                type="text"
                style={{ marginLeft: "5px" }}
                value={this.state.Email}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <button className="btn" onClick={this.handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default UserScreen;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      resolve(filereader.result);
    };
    filereader.onerror = (error) => {
      reject(error);
    };
  });
}
