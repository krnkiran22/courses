const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseTeacher: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
