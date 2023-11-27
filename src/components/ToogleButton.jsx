import React, { Component } from "react";

class ToogleButton extends Component {
  render() {
    return (
      <div className="row" style={{ marginLeft: "10px", marginRight: "10px" }}>
        {this.props.label}
        <div className="form-check form-switch" style={{ marginLeft: "auto" }}>
          <input
            type="checkbox"
            className="form-check-input"
            name={this.props.name}
            id={this.props.name}
            value={this.props.value}
            onClick={this.props.onClick}
          />
        </div>
      </div>
    );
  }
}

export default ToogleButton;
