import React, { Component } from "react";
import AttachButton from "./attach_button";

class ChatBox extends Component {
  render() {
    const { value, onChange, onSubmit, handleKeyDown } = this.props;
    return (
      <div className="input-group">
        <AttachButton />
        <input
          type="text"
          className="form-control"
          placeholder="Type Here"
          name="message"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <div className="input-group-prepend">
          <span className="input-group-text btn" onClick={onSubmit}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default ChatBox;
