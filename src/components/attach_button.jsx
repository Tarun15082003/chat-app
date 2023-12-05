import React, { Component } from "react";

class AttachButton extends Component {
  state = {};
  handleFileChange = (e) => {
    const selectedFiles = e.target.files;
  };
  render() {
    return (
      <div className="input-group-prepend dropdown">
        <label htmlFor="file-upload" className="custom-file-upload">
          <i
            className="fa fa-paperclip btn"
            aria-hidden="true"
            style={{ paddingTop: "10px" }}
          ></i>
        </label>
        <input
          type="file"
          label="file"
          multiple
          id="file-upload"
          style={{ display: "none" }}
          onChange={(e) => {
            this.handleFileChange(e);
          }}
        />
      </div>
    );
  }
}

export default AttachButton;
