import dbConnection from "../db/index";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  searchAndUpdateCourse,
  deleteCourse
} from "../db/models/course";

dbConnection();
export async function create(obj) {
  let course = await createCourse(obj);
  return course;
}

export async function getAll() {
  let courses = await getCourses();
  if (courses.length < 1) return "No courses available";
  return courses;
}

export async function getCourse(id) {
  let courses = await getCourseById(id);
  //if (courses.length < 1) return "No course available by the id:" + id;
  return courses;
}
