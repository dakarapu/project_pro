import React from "react";
import CourseClient from "./apiClient/courseClient";
import CourseTableView from "./CourseTableView";
import "./styles/course.css";
import ls from "local-storage";
import Menu from "./Menu";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      couses: null
    };
  }

  getCoursesList = async () => {
    let token = await ls.get("x-auth-token");
    console.log("Course TOken:", token);
    try {
      if (token) {
        console.log("Course Comp Token", typeof token);
        let list = await CourseClient(token);
        console.log("Courses received: ", list);
        this.setState({
          courses: list.data
        });
      }
    } catch (e) {
      return e;
    }
  };

  logoutClick() {
    ls.clear();
    window.location.reload();
    //return <Redirect to={"/"} />;
  }

  componentWillMount() {
    this.getCoursesList();
  }

  render() {
    const data = ls.get("x-auth-token") ? (
      this.state.courses ? (
        <CourseTableView list={this.state.courses} />
      ) : (
        "No Courses"
      )
    ) : (
      <Redirect to="/" />
    );
    return (
      <div>
        <Menu isCoursesActive={"active"} />
        <div className={"course-table"}>
          <div className={"ui grid"}>
            <div className="two wide column">
              <i className={"book icon huge"} />
            </div>
            <div className={"fourteen wide column"}>{data}</div>
            <button key={"logout"} onClick={this.logoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
