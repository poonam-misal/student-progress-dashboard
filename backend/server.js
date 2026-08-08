const express = require('express');
const cors = require('cors');

const {
  student,
  courses,
  activities,
  lessons,
  analytics
} = require('./data/seedData');

const app = express();

app.use(cors());
app.use(express.json());


// LOGIN API
app.post('/api/auth/login', (req, res) => {

  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  res.json({
    token: 'demo-jwt-token',
    role: role || 'student',
    student
  });
});


// DASHBOARD API
app.get('/api/dashboard/1', (req, res) => {

  res.json({
    student,
    courses
  });

});


// ANALYTICS API
app.get('/api/analytics/1', (req, res) => {

  res.json(analytics);

});


// LESSONS API
app.get('/api/lessons/1', (req, res) => {

  res.json(lessons);

});


// ACTIVITIES API
app.get('/api/activities/1', (req, res) => {

  res.json(activities);

});


// ADAPTIVE RECOMMENDATION API
app.get('/api/recommendations/1', (req, res) => {

  const recommendations = courses.map(course => {

    if (course.progress < 50) {
      return `Focus on ${course.name}`;
    }

    if (course.progress < 80) {
      return `Continue ${course.name}`;
    }

    return `You are ready for advanced ${course.name}`;

  });

  res.json(recommendations);

});


// SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});