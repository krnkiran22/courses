const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create a Course
router.post('/create', async (req, res) => {
    try {
        const { courseId, courseName, courseDescription, courseTeacher } = req.body;
        const course = new Course({ courseId, courseName, courseDescription, courseTeacher });
        await course.save();
        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create course' });
    }
});

// Get All Courses
router.get('/all', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// Delete a Course
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete course' });
    }
});

module.exports = router;
