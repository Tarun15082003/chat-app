import io from "socket.io-client";
import Peer from "simple-peer";
import React, { Component } from "react";
import { getChat } from "../services/ChatService";
import UserItem from "./userItem";
import { Redirect } from "react-router-dom";

class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourID: "",
      users: {},
      stream: null,
      receivingCall: false,
      caller: "",
      callerSignal: null,
      callAccepted: false,
      users_ids: [],
      current_user: null,
    };

    this.userVideo = React.createRef();
    this.partnerVideo = React.createRef();
  }

  async componentDidMount() {
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      const userId = this.props.user._id;
      this.socket.emit("registerUser", userId);
    });

    this.socket.on("allUsers", (data) => {
      this.setState({ users: data, yourID: data[this.props.user._id] });
    });

    this.socket.on("hey", (data) => {
      this.setState({
        receivingCall: true,
        caller: data.from,
        callerSignal: data.signal,
      });
    });

    const id = this.props.match.params.id;
    const { data: chat } = await getChat(id);
    const users_ids = chat.users;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.setState({ stream });
      if (this.userVideo.current) {
        this.userVideo.current.srcObject = stream;
      }
    });
    this.setState({ users_ids, current_user: this.props.user });
  }

  callPeer = (key, item) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: this.state.stream,
    });

    peer.on("signal", (data) => {
      this.socket.emit("callUser", {
        userToCall: key,
        signalData: data,
        from: this.state.yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (this.partnerVideo.current) {
        this.partnerVideo.current.srcObject = stream;
      }
    });

    this.socket.on("callAccepted", (signal) => {
      peer.signal(signal);
      this.setState({ callAccepted: true });
    });
  };

  acceptCall = () => {
    const { stream, callerSignal } = this.state;

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      this.socket.emit("acceptCall", { signal: data, to: this.state.caller });
    });

    peer.on("stream", (stream) => {
      if (this.partnerVideo.current) {
        this.partnerVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);

    this.setState({ callAccepted: true, peer: peer });
  };

  endCall = () => {
    const { peer } = this.state;
    if (peer) {
      peer.destroy();
    }
  };

  render() {
    const {
      stream,
      users,
      yourID,
      callAccepted,
      receivingCall,
      caller,
      users_ids,
    } = this.state;

    let UserVideo;
    if (stream) {
      UserVideo = (
        <div>
          <h6 className="align-items-center justify-content-center">You</h6>
          <video
            className="user-video"
            playsInline
            muted
            ref={this.userVideo}
            autoPlay
            style={{ marginRight: "3px" }}
          />
        </div>
      );
    }

    let PartnerVideo;
    if (callAccepted) {
      PartnerVideo = (
        <div>
          <h6 className="align-items-center justify-content-center">
            Other User
          </h6>
          <video
            className="user-video"
            playsInline
            ref={this.partnerVideo}
            autoPlay
            style={{ marginLeft: "3px" }}
          />
        </div>
      );
    }

    let incomingCall;
    if (receivingCall) {
      const userId = Object.keys(users).find((key) => users[key] === caller);
      const user = users_ids.find((u) => u._id === userId);
      incomingCall = (
        <div>
          <p>{user.name} is calling you...</p>
          <button onClick={this.acceptCall}>Accept</button>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="video-screen">
          <div className="dropdown" style={{ marginBottom: "15px" }}>
            <button
              className="btn dropdown-toggle btn-primary"
              type="button"
              data-toggle="dropdown"
              aria-expanded="false"
              style={{
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              Users
            </button>
            <ul className="dropdown-menu">
              {this.state.users_ids.map((item) =>
                item._id !== this.state.current_user._id ? (
                  <UserItem
                    data={item}
                    key={item._id}
                    users={users}
                    onClick={this.callPeer}
                  />
                ) : null
              )}
            </ul>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center ">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">{UserVideo}</div>
                  <div className="col-sm-6">{PartnerVideo}</div>
                </div>
                <div className="row align-items-center justify-content-center ">
                  {this.state.callAccepted ? (
                    <button className="btn btn-danger" onClick={this.endCall}>
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </button>
                  ) : (
                    incomingCall
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoScreen;
