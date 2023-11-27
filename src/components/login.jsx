import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import * as authService from "../services/authService";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      await authService.login(email, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400);
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/chats" />;
    return (
      <div className="loginScreen">
        <div>
          <p>
            Not a User? <Link to={`/register`}>Register Now</Link>
          </p>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
