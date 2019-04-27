import React from "react";
import CourseClient from "./apiClient/courseClient";
import CourseTableView from "./CourseTableView";
import "./styles/course.css";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      couses: null
    };
  }

  getCoursesList = async () => {
    try {
      let list = await CourseClient(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2E4M2M3NzY0ZmI5YzI2N2M3ZGE1MWIiLCJmaXJzdE5hbWUiOiJSYXZpa2FudGhfMiIsImVtYWlsIjoiZGFrYXJhcHVfNUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTYzNjAxMzl9.0Zwrk-Ba6uqaDPBla98JzVwKUvJtKkQtEV8wpuqg-PQ"
      );
      console.log("Courses received: ", list);
      this.setState({
        courses: list.data
      });
    } catch (e) {
      return e;
    }
  };

  componentWillMount() {
    this.getCoursesList();
  }

  render() {
    return (
      <div className={"course-table"}>
        <div className={"ui grid"}>
          <div className="two wide column">
            <p>{"This is course Page..."}</p>
          </div>
          <div className="fourteen wide column">
            {this.state.courses ? (
              <CourseTableView list={this.state.courses} />
            ) : (
              "No Courses"
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
