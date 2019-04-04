import mongoose from "mongoose";

const schema = new mongoose.Schema({
  // validating name property as required by mongoose and also setting min and max length
  name: { type: String, minlength: 5, maxlength: 255, required: true },
  author: String,
  // validating category with enums so the inputs only take the mentioned enum values
  category: { type: String, required: true, enum: ["node", "react", "author"] },
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    // validation is set to check if isPublished is set true using anonymous func
    // never use arrow function as it cannot recognise this keyword
    type: Number,
    required: function() {
      return this.isPublished;
    }
  }
});

// Tis course model is a class to always start with Uppercase letter
// the parameters for model here are 'course'- collection name, schema - defined schema to use
const Course = mongoose.model("course", schema);

// Create and save new course
export async function createCourse() {
  const course = new Course({
    name: "Science",
    author: "Ravikanth",
    category: "node",
    tags: ["physics", "chemistry"], //date property is not defined as we have set default value
    isPublished: true,
    price: 150
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

// find a course by query can change it to find by ID
export async function getCourses() {
  const result = await Course.find({
    author: "Ravikanth",
    isPublished: true
  })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(result);
}

// this update function follows as by find and then save method
export async function searchAndUpdateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.name = "Geography";
  course.author = "Dakarapu";
  const result = await course.save();
  console.log(result);
}

// this update method uses update query function and updates document directly
// rather than first find and then save as above function
// this is much faster and can update multiple documents if provided the update criteria
export async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        name: "History",
        author: "Ravikanth"
      }
    }
  );
  console.log(result);
}

// deleteOne() removes a record from database
// deleteMany() can remove multiple matched documents
// findByIdAndRemove() finds a document and remoes from DB and returns the deleted document
export async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}
