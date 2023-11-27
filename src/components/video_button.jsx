import React, { Component } from "react";
import { Link } from "react-router-dom";

class VideoButton extends Component {
  render() {
    return (
      <Link
        to={`/chats/videocall/${this.props.data._id}`}
        className="col btn"
        style={{
          textAlign: "center",
          boxShadow: "2px 2px 5px 0px #000000",
          marginRight: "4px",
          marginTop: "5px",
        }}
      >
        <i className="fa fa-video-camera" aria-hidden="true"></i>
      </Link>
    );
  }
}

export default VideoButton;
