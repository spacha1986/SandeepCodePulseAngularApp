import { Component } from '@angular/core';
import { LoginRequest } from '../model/login-request.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private location: Location // Import Location from '@angular/common'
  ) {
    
  }

  onSubmit(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%?])[A-Za-z\d!@#$%?]{8,}$/;

    this.emailInvalid = !emailPattern.test(this.email);
    this.passwordInvalid = !passwordPattern.test(this.password);
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;

    if (this.emailInvalid || this.passwordInvalid || this.passwordsDoNotMatch) {
      return;
    }
    console.log('Form submitted:', {
      email: this.email,
      password: this.password});
    const model: LoginRequest = {
      email: this.email,
      password: this.password
    };
    
    // Call the register method from AuthService
    this.authService.register(model).subscribe({
      next: () => {
        console.log('Registration successful');
        alert('Registration successful! You can now log in.');
        this.router.navigateByUrl('/');
        // Optionally, redirect to login or home page after successful registration
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }

  goBack(): void {
    this.location.back(); // Use Location service to navigate back
  }
}
