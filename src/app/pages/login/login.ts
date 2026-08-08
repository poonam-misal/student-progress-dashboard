import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../services/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  role = 'student';
  errorMessage = '';

  constructor(
    private router: Router,
    private studentService: Student
  ) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.studentService.login(loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role);

        this.router.navigate(['/dashboard']);
      },

      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}