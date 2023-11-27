import React, { Component } from "react";

class UserItem extends Component {
  render() {
    const { data: item, users } = this.props;
    return (
      <div className="row \-md-auto">
        <div className="col-md-auto">
          <img
            className="profile-image"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
        </div>
        <div className="col-md-auto">{item.name}</div>
        <div className="col-md-auto" style={{ marginRight: "5px" }}>
          <button
            className="btn btn-primary"
            onClick={() => this.props.onClick(users[item._id], item)}
            disabled={users[item._id] === undefined ? true : false}
          >
            Call
          </button>
        </div>
      </div>
    );
  }
}

export default UserItem;
