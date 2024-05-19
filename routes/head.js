var express = require("express");
var router = express.Router();
var Courses = require("../models/courses");
//GET Routes
router.get("/", function (req, res, next) {
  res.send("Head Dashboard");
});

router.get("/getmarks/:sid", function (req, res, next) {
  const studentId = req.params.sid;
  console.log(`Fetching marks for student ID: ${studentId}`);

  // Find all courses that the student is enrolled in and get the marks
  Courses.find({ "students.sid": studentId })
    .populate("students.sid", "name") // Correctly populate student details
    .exec()
    .then((courses) => {
      // Check if courses is an array
      if (!Array.isArray(courses)) {
        throw new Error("Unexpected response type, expected an array.");
      }

      // Extract the marks for the specific student
      const result = courses.map((course) => {
        const studentInfo = course.students.find(
          (student) => student.sid.toString() === studentId
        );
        return {
          courseName: course.name,
          marks: studentInfo ? studentInfo.marks : null,
        };
      });

      res.json(result); // Only one response will be sent
    })
    .catch((error) => {
      console.error(`Error retrieving marks: ${error.message}`);
      if (!res.headersSent) {
        // Check if headers are already sent
        res
          .status(500)
          .json({ message: "Error retrieving marks", error: error.message });
      }
    });
});

module.exports = router;
