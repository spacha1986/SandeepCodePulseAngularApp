import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptRequest(request)) {
      const authRequest = request.clone({
        setHeaders: {
          'Authorization': this.cookieService.get('Authorization')
        }
      });
      return next.handle(authRequest).pipe(
        tap((event:HttpEvent<unknown>) => {
          if (event instanceof HttpResponse) {
            // Optionally, you can handle the response here
            console.log('Response received:', event);
          }
        })
      );
    }
    return next.handle(request).pipe(
      tap((event:HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          // Optionally, you can handle the response here
          console.log('Response received without auth:', event);
        }
      })
    );
    
  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true') > -1 ? true : false;
  }
}
