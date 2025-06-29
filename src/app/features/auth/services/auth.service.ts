import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    // Here you would typically make an HTTP request to your backend API
    // to authenticate the user with the provided email and password.
    console.log('Login request:', request);
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  register(request: LoginRequest): Observable<void> {
    // Here you would typically make an HTTP request to your backend API
    // to register the user with the provided email and password.
    console.log('Register request:', request);
    return this.http.post<void>(`${environment.apiBaseUrl}/api/auth/register`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void {

    this.$user.next(user);
    // Store user information in local storage or a service
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    // Return the current user as an observable
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    // Get the current user from the BehaviorSubject
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if (email && roles) {
      return {
        email: email,
        roles: roles.split(',')
      };
    }
    return undefined;
  }

  logout(): void {
    // Clear user information and reset the BehaviorSubject
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-roles');
    this.cookieService.delete('Authorization', '/', undefined, true, 'Strict');
    this.$user.next(undefined);
    console.log('User logged out');
  }
}
