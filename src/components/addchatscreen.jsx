import React from "react";
import BackButton from "./back_button";
import Form from "./form";
import Joi from "joi-browser";

class AddChatScreen extends Form {
  state = {
    data: {
      isGroupChat: false,
      users: [],
      chatName: "",
    },
    errors: {},
  };

  schema = {
    isGroupChat: Joi.boolean().required().label("Group Chat"),
    chatName: Joi.string().required().label("Chat Name"),
    users: Joi.label("Users"),
  };

  render() {
    return (
      <div>
        <div
          className="row"
          style={{
            marginBottom: "10px",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <div className="profile">
            <BackButton
              handlebackbutton={this.props.handlebackbutton}
              data="addchatscreen"
            />
          </div>
        </div>
        <h3>Add a new chat</h3>
        <form>
          {this.renderToogle("isGroupChat", "Group Chat")}
          {this.renderInput("chatName", "Chat Name")}
          {this.renderButton("Add new Chat")}
        </form>
      </div>
    );
  }
}

export default AddChatScreen;
