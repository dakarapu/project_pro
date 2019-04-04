import dbConnection from "../db/index";
import {
  createCourse,
  getCourses,
  updateCourse,
  searchAndUpdateCourse,
  deleteCourse
} from "../db/models/course";

dbConnection();
export function create(obj) {
  console.log("COURSE CONTROLLER.....................");
  return new Promise((resolve, reject) => {
    let course = createCourse(obj);
    if (course.error) reject(course.error);
    resolve(course.response);
  });
}
