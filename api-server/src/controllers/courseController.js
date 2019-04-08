import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  searchAndUpdateCourse,
  deleteCourse
} from "../db/models/course";

export async function create(obj) {
  try {
    let course = await createCourse(obj);
    return course;
  } catch (e) {
    return e;
  }
}

export async function getAll() {
  try {
    let courses = await getCourses();
    if (courses && courses.length < 1) return "No courses available";
    return courses;
  } catch (e) {
    return e;
  }
}

export async function getCourse(id) {
  try {
    let course = await getCourseById(id);
    return course;
  } catch (e) {
    return e;
  }
}

export async function update(id, obj) {
  try {
    let course = await updateCourse(id, obj);
    return course;
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let course = await deleteCourse(id);
    return course;
  } catch (e) {
    return e;
  }
}
