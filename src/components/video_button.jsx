import React, { Component } from "react";

class VideoButton extends Component {
  render() {
    return (
      <button
        className="col btn"
        style={{
          textAlign: "center",
          boxShadow: "2px 2px 5px 0px #000000",
          marginRight: "4px",
          marginTop: "5px",
        }}
      >
        <i className="fa fa-video-camera" aria-hidden="true"></i>
      </button>
    );
  }
}

export default VideoButton;
