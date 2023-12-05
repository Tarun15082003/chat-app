import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import * as authService from "../services/authService";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      profileImage: require("../images/user_image.jpg"),
      lastseen: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
    profileImage: Joi.binary().label("Image"),
    lastseen: Joi.label("Lastseen"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="loginScreen">
        <div>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;

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
