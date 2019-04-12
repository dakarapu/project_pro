import {
  courseObjValidation,
  userObjValidation,
  authObjValidation
} from "../../../src/utilities/schemaDefinitions";

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

const courseNoCourseId = {
  name: "8340384",
  author: "rk",
  category: "react",
  tags: ["physics", "chemistry"],
  tags_2: ["portal"],
  tags_3: ["2354"],
  isPublished: true,
  price: 200
};

const courseNoCategory = {
  name: "8340384",
  courseId: "220",
  author: "rk",
  category: "",
  tags: ["physics", "chemistry"],
  tags_2: ["portal"],
  tags_3: ["2354"],
  isPublished: true,
  price: 200
};

const user = {
  firstName: "Tony",
  lastName: "Stark",
  email: "tony_s@gmail.com",
  password: "123456",
  phone: "0450018432",
  role: "registeredUser"
};

const userInvalidEmail = {
  firstName: "Tony",
  lastName: "Stark",
  email: "tony_s",
  password: "123456",
  phone: "0450018432",
  role: "registeredUser"
};

const userEmptyPassword = {
  firstName: "Tony",
  lastName: "Stark",
  email: "tony_s@gmail.com",
  password: "",
  phone: "0450018432",
  role: "registeredUser"
};

const auth = {
  email: "tony_s@gmail.com",
  password: "123456"
};

const authNoEmail = { password: "123456" };

describe("Test Utilitites schemaDefinitions for Course", () => {
  it("courseObjValidation - test successfull schema", () => {
    expect(courseObjValidation(course)).toBe(null);
  });

  it("courseObjValidation - test error schema with no courseId", () => {
    let error = courseObjValidation(courseNoCourseId);
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

  it("courseObjValidation - test error schema with no category", () => {
    let error = courseObjValidation(courseNoCategory);
    expect(error).toHaveProperty("name", "ValidationError");
    expect(error).toHaveProperty("details", [
      {
        message: '"category" is not allowed to be empty',
        path: ["category"],
        type: "any.empty",
        context: {
          value: "",
          invalids: [""],
          key: "category",
          label: "category"
        }
      }
    ]);
  });
});

describe("Test Utilitites schemaDefinitions for User", () => {
  it("userObjValidation - test successfull schema", () => {
    expect(userObjValidation(user)).toBe(null);
  });

  it("userObjValidation - test error schema with invalid email", () => {
    let error = userObjValidation(userInvalidEmail);
    expect(error).toHaveProperty("name", "ValidationError");
    expect(error).toHaveProperty("details", [
      {
        message: '"email" must be a valid email',
        path: ["email"],
        type: "string.email",
        context: {
          value: "tony_s",
          key: "email",
          label: "email"
        }
      }
    ]);
  });

  it("userObjValidation - test error schema with empty password", () => {
    let error = userObjValidation(userEmptyPassword);
    expect(error).toHaveProperty("name", "ValidationError");
    expect(error).toHaveProperty("details", [
      {
        message: '"password" is not allowed to be empty',
        path: ["password"],
        type: "any.empty",
        context: {
          value: "",
          invalids: [""],
          key: "password",
          label: "password"
        }
      }
    ]);
  });
});

describe("Test Utilitites schemaDefinitions for Authentication", () => {
  it("authObjValidation - test successfull schema", () => {
    expect(authObjValidation(auth)).toBe(null);
  });

  it("authObjValidation - test error schema with no email", () => {
    let error = authObjValidation(authNoEmail);
    expect(error).toHaveProperty("name", "ValidationError");
    expect(error).toHaveProperty("details", [
      {
        message: '"email" is required',
        path: ["email"],
        type: "any.required",
        context: {
          key: "email",
          label: "email"
        }
      }
    ]);
  });
});
