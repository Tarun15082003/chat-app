import io from "socket.io-client";
import Peer from "simple-peer";
import React, { Component } from "react";
import { getChat } from "../services/ChatService";
import UserItem from "./userItem";

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
      users_logged_in: {},
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

    this.socket.on("loggedInUsers", (data) => {
      this.setState({ users_logged_in: data });
    });

    this.socket.on("hey", (data) => {
      this.setState({
        receivingCall: true,
        caller: data.from,
        callerSignal: data.signal,
      });
    });

    this.socket.on("endCall", () => {
      const { peer, stream } = this.state;
      const stopTracks = () => {
        return Promise.all(stream.getTracks().map((track) => track.stop()));
      };
      stopTracks().then(() => {
        this.socket.emit("disconnect-request");
        if (peer) {
          peer.destroy();
        }
        this.props.history.replace(`/chats/${this.props.match.params.id}`);
      });
    });

    const id = this.props.match.params.id;
    const { data: chat } = await getChat(id);
    const users_ids = chat.users;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.setState({ stream });
        if (this.userVideo.current) {
          this.userVideo.current.srcObject = stream;
        }
      });
    this.setState({ users_ids, current_user: this.props.user });
  }

  onRequest = (item) => {
    this.socket.emit("RequestVideoCall", {
      user: item,
      current_user: this.props.user,
      chatId: this.props.match.params.id,
    });
  };

  callPeer = (key, item) => {
    this.setState({ otherUser: item });
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

    const { users, caller, users_ids } = this.state;

    const otherUserId = Object.keys(users).find((key) => users[key] === caller);
    const otherUser = users_ids.find((u) => u._id === otherUserId);
    this.setState({ callAccepted: true, peer: peer, otherUser });
  };

  endCall = () => {
    this.socket.emit("startEndCall", {
      userId1: this.state.current_user._id,
      userId2: this.state.otherUser._id,
    });
  };

  handlebackbutton = async () => {
    const { stream } = this.state;
    const stopTracks = () => {
      return Promise.all(stream.getTracks().map((track) => track.stop()));
    };
    stopTracks().then(() => {
      setTimeout(() => {
        this.props.history.replace(`/chats/${this.props.match.params.id}`);
      }, 1000);
    });
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
      users_logged_in,
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
            {this.state.otherUser && this.state.otherUser.name}
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
          <h6>{user.name} is calling you...</h6>
          <button className="btn btn-primary" onClick={this.acceptCall}>
            Accept
          </button>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="video-screen">
          <button className="btn" onClick={this.handlebackbutton}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
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
                    onRequest={this.onRequest}
                    users_logged_in={users_logged_in}
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
                <div
                  className="row align-items-center justify-content-center"
                  style={{ marginTop: "10px" }}
                >
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
