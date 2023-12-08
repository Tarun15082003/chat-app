import React, { Component } from "react";

class MoreButton extends Component {
  handleClick = () => {
    let formattedText = "";
    const { users } = this.props.data;
    const { old_messages } = this.props;
    old_messages.forEach((message) => {
      formattedText += `${message.timestamp} - ${
        users.find((u) => u._id === message.isSender).name
      }: ${message.message}\n`;
    });
    const blob = new Blob([formattedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat_export.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  render() {
    const { all_users, currentChat } = this.props;
    return (
      <div className="row">
        <div className="dropdown col-md-auto">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
            style={{
              textAlign: "center",
              boxShadow: "2px 2px 5px 0px #000000",
              marginLeft: "4px",
              marginTop: "5px",
            }}
          ></button>
          <ul className="dropdown-menu dropdown-menu-right">
            <li>
              <button className="dropdown-item btn" onClick={this.handleClick}>
                Export Chat as Text
              </button>
            </li>
          </ul>
        </div>

        {/* {currentChat.isGroupChat && (
          <div className="dropdown col-md-auto">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-expanded="false"
              style={{
                textAlign: "center",
                boxShadow: "2px 2px 5px 0px #000000",
                marginLeft: "4px",
                marginTop: "5px",
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-right">
              {all_users.map(
                (item) =>
                  item._id !== this.props.current_user._id && (
                    <li
                      onClick={() => this.handleClick(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row">
                        <div className="col-md-auto">
                          <img
                            className="profile-image"
                            src={`http://localhost:3000/api/profileImages/${item.profileImage}`}
                            alt="avatar"
                          />
                        </div>
                        <div
                          className="col-md-auto"
                          style={{ paddingRight: "5px", paddingLeft: "5px" }}
                        >
                          {item.name}
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        )} */}
      </div>
    );
  }
}

export default MoreButton;
