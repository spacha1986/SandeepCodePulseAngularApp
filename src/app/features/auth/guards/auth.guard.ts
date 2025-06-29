import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";


export const authGuard : CanActivateFn = (route, state) => {
  // Check for jwt token in local storage or cookies
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const user = authService.getUser();

  let token = cookieService.get('Authorization');
  if (token) {
    // If token exists, allow access
    token = token.replace('Bearer ', ''); // Remove 'Bearer ' prefix if present
    const decodedToken: any = jwtDecode(token); // Optionally decode the token to check its validity

    // check if the token is expired
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      // Token is expired, redirect to login
      authService.logout(); // Clear any existing user session
      return router.createUrlTree(['/login'], 
        {queryParams : { returnUrl: state.url }});
    }
    // Token is valid, proceed with the request
    if (user && user.roles && user.roles.length > 0 && user.roles.includes('Writer')) {
      return true;
    }
    alert('You are not authorized to access this page.');
    return router.createUrlTree(['/'], 
      {queryParams : { returnUrl: state.url }});
  } else {
    // If no token, redirect to login page
    authService.logout(); // Clear any existing user session

    console.log('No token found, redirecting to login');
    return router.createUrlTree(['/login'], 
      {queryParams : { returnUrl: state.url }});
  }
}