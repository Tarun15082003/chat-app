import React, { Component } from "react";
import AttachButton from "./attach_button";

class ChatBox extends Component {
  state = {
    file: null,
  };

  handlefiles = (file) => {
    this.setState({ file });
  };

  render() {
    const { value, onChange, onSubmit, handleKeyDown } = this.props;
    const file = this.state.file;
    const message = file === null ? value : "1 file selected";
    return (
      <div className="input-group">
        <AttachButton handlefiles={this.handlefiles} />
        <input
          type="text"
          className="form-control"
          placeholder="Type Here"
          name="message"
          value={message}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={(e) => handleKeyDown(e, file)}
          readOnly={file}
        />
        <div className="input-group-prepend">
          <button
            className="input-group-text btn"
            onClick={() => onSubmit(file)}
            disabled={value === "" ? (file === null ? true : false) : false}
          >
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ChatBox;
