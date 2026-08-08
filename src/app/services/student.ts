import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Student {
    private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  getDashboard() {
    return this.http.get<any>(`${this.apiUrl}/dashboard/1`);
  }

  getAnalytics() {
    return this.http.get<any>(`${this.apiUrl}/analytics/1`);
  }

  getLessons() {
    return this.http.get<any>(`${this.apiUrl}/lessons/1`);
  }

  getActivities() {
    return this.http.get<any>(`${this.apiUrl}/activities/1`);
  }

  getRecommendations() {
    return this.http.get<any>(`${this.apiUrl}/recommendations/1`);
  }
}
