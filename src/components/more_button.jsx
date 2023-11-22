import React, { Component } from "react";

class MoreButton extends Component {
  render() {
    return (
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
          style={{
            textAlign: "center",
            boxShadow: "2px 2px 5px 0px #000000",
            marginLeft: "4px",
            marginTop: "5px",
          }}
        ></button>
        <ul className="dropdown-menu dropdown-menu-right">
          <li>
            <a className="dropdown-item" href="#">
              Export Chat as Text
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default MoreButton;
