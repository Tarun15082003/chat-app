import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          name="query"
          className="form-control bg-light"
          placeholder="Seacrh..."
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.currentTarget.value)}
        />
        <div className="input-group-prepend">
          <span className="input-group-text btn">
            <i
              className="fa fa-plus"
              onClick={this.props.onClick}
              aria-hidden="true"
            ></i>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBox;
