import { Component } from '@angular/core';
import { LoginRequest } from '../model/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService:AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onSubmit() : void {
    console.log('Login request submitted:', this.model);
    this.authService.login(this.model).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Set Auth cookies or local storage with the token
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');

        // Set user information in the AuthService
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // Redirect to home or dashboard after successful login
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., show error message to user
      }
    });
  }
}
