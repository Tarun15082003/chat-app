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

  componentDidMount() {
    const users = [...this.state.data.users, this.props.current_user];
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        users,
      },
    }));
  }

  schema = {
    isGroupChat: Joi.boolean().required().label("Group Chat"),
    chatName: Joi.string().required().label("Chat Name"),
    users: Joi.label("Users"),
  };

  handleClick = (item) => {
    const users = [...this.state.data.users, item];
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        users,
      },
    }));
  };

  handleDelete = (event, item) => {
    event.preventDefault();
    const users = this.state.data.users.filter((user) => user._id !== item._id);
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        users,
      },
    }));
  };

  render() {
    const { users } = this.props;
    const { data } = this.state;
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
          <div className="input-group m-2">
            <input
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu">
              {data.users.map((item) => (
                <li style={{ cursor: "pointer" }} key={this.state.chatName}>
                  <div className="row">
                    <div className="col-md-auto">
                      <img
                        className="profile-image"
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="avatar"
                      />
                    </div>
                    <div
                      className="col-md-auto"
                      style={{ paddingRight: "5px", paddingLeft: "5px" }}
                    >
                      {item.name}
                    </div>
                    <div className="col-md-auto" style={{ marginRight: "5px" }}>
                      <button
                        className="btn btn-danger"
                        onClick={(event) => this.handleDelete(event, item)}
                        style={{ marginRight: "2px" }}
                        disabled={this.props.current_user._id === item._id}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="input-group-prepend dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                {users.map(
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
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
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
          </div>
          <button
            disabled={this.validate()}
            className="btn btn-primary m-2"
            onClick={(event) => this.props.onSubmit(event, this.state.data)}
          >
            {"Add new chat"}
          </button>
        </form>
      </div>
    );
  }
}

export default AddChatScreen;
