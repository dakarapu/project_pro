import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  searchAndUpdateCourse,
  deleteCourse
} from "../db/models/course";

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
  let course = await getCourseById(id);
  return course;
}

export async function update(id, obj) {
  let course = await updateCourse(id, obj);
  return course;
}

export async function remove(id) {
  let course = await deleteCourse(id);
  return course;
}
