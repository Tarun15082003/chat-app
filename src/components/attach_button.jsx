import React, { Component } from "react";

class AttachButton extends Component {
  state = {};
  render() {
    return (
      <div className="input-group-prepend dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-paperclip" aria-hidden="true"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default AttachButton;
