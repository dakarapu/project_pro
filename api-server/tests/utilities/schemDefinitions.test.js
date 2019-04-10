import {
  courseObjValidation,
  userObjValidation,
  authObjValidation
} from "../../src/utilities/schemaDefinitions";

const course = {
  name: "8340384",
  courseId: "220",
  author: "rk",
  category: "react",
  tags: ["physics", "chemistry"],
  tags_2: ["portal"],
  tags_3: ["2354"],
  isPublished: true,
  price: 200
};

const course_1 = {
  name: "8340384",
  author: "rk",
  category: "react",
  tags: ["physics", "chemistry"],
  tags_2: ["portal"],
  tags_3: ["2354"],
  isPublished: true,
  price: 200
};

describe("Test Utilitites schemaDefinitions", () => {
  it("courseObjValidation - test successfull schema", () => {
    expect(courseObjValidation(course)).toBe(null);
  });
  //[ValidationError: child "courseId" fails because ["courseId" is required]]
  it("courseObjValidation - test error schema with no courseId", () => {
    let error = courseObjValidation(course_1);
    expect(error).toHaveProperty("name", "ValidationError");
    expect(error).toHaveProperty("details", [
      {
        message: '"courseId" is required',
        path: ["courseId"],
        type: "any.required",
        context: {
          key: "courseId",
          label: "courseId"
        }
      }
    ]);
  });
});
