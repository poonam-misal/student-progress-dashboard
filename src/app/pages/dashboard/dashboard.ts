import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Student } from '../../services/student';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  student: any = {};
  courses: any[] = [];
  activities: any[] = [];
  recommendations: string[] = [];

  role = localStorage.getItem('userRole') || 'student';

  analytics: any;
  chartsReady = false;

  constructor(
    private studentService: Student,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadActivities();
    this.loadRecommendations();
    this.loadAnalytics();
  }

  ngAfterViewInit(): void {
    this.chartsReady = true;
    this.renderChartsIfReady();
  }

  loadDashboard() {
    this.studentService.getDashboard().subscribe({
      next: (data: any) => {
        this.student = data.student;
        this.courses = data.courses;
      },
      error: (error) => {
        console.error('Dashboard API error:', error);
      }
    });
  }

  loadActivities() {
    this.studentService.getActivities().subscribe({
      next: (data: any) => {
        this.activities = data;
      }
    });
  }

  loadRecommendations() {
    this.studentService.getRecommendations().subscribe({
      next: (data: any) => {
        this.recommendations = data;
      }
    });
  }

  loadAnalytics() {
    this.studentService.getAnalytics().subscribe({
      next: (data: any) => {
        this.analytics = data;
        this.renderChartsIfReady();
      }
    });
  }

  renderChartsIfReady() {
    if (!this.chartsReady || !this.analytics) {
      return;
    }

    new Chart('trendChart', {
      type: 'line',
      data: {
        labels: this.analytics.labels,
        datasets: [{
          label: 'Learning Hours',
          data: this.analytics.learningTrend
        }]
      }
    });

    new Chart('progressChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [
            this.analytics.completed,
            this.analytics.remaining
          ]
        }]
      }
    });
  }

  exportToCSV() {
    const rows = this.courses.map(course => ({
      Course: course.name,
      Progress: `${course.progress}%`
    }));

    const header = 'Course,Progress\n';

    const csv = header + rows
      .map(row => `${row.Course},${row.Progress}`)
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'student-progress.csv';
    link.click();

    window.URL.revokeObjectURL(url);
  }

  scrollTo(sectionId: string): void {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
