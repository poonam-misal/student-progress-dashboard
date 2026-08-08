const student = {
  id: 1,
  name: 'Poonam',
  email: 'student@example.com',
  completedLessons: 24,
  timeSpent: 38,
  overallProgress: 72,
  activeCourses: 3
};

const courses = [
  { id: 1, name: 'Angular Development', progress: 80 },
  { id: 2, name: 'JavaScript Advanced', progress: 65 },
  { id: 3, name: 'TypeScript Fundamentals', progress: 45 }
];

const activities = [
  {
    lesson: 'Angular Routing',
    course: 'Angular Development',
    time: 'Today'
  },
  {
    lesson: 'RxJS Operators',
    course: 'Angular Development',
    time: 'Yesterday'
  },
  {
    lesson: 'Async/Await',
    course: 'JavaScript Advanced',
    time: '2 days ago'
  }
];

const lessons = [
  { id: 1, title: 'Angular Routing', completed: true },
  { id: 2, title: 'RxJS Operators', completed: true },
  { id: 3, title: 'Angular Performance', completed: false }
];

const analytics = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  learningTrend: [1, 2, 1.5, 3, 2.5, 4, 3],
  completed: 72,
  remaining: 28
};

module.exports = {
  student,
  courses,
  activities,
  lessons,
  analytics
};