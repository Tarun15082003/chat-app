import React, { Component } from "react";

class BackButton extends Component {
  render() {
    return (
      <button
        className="btn"
        onClick={() => this.props.handlebackbutton(this.props.data)}
      >
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </button>
    );
  }
}

export default BackButton;
