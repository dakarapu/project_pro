import React from "react";

class Menu extends React.Component {
  render() {
    return (
      <div className="ui secondary pointing menu">
        <a className={`item ${this.props.isHomeActive}`} href={"/home"}>
          Home
        </a>
        <a className={`item ${this.props.isCoursesActive}`} href={"/courses"}>
          Courses
        </a>
        <a className={`item ${this.props.isUsersActive}`} href={"/users"}>
          Users
        </a>
        <div className="right menu">
          <a className="ui item" href={"/login"}>
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default Menu;
