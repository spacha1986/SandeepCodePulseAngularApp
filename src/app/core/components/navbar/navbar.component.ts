import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/model/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: User;

  constructor(private authService : AuthService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.authService.user()
    .subscribe ({
      next: (user) => {
        console.log('Current user:', user);
        // You can use the user information to update the navbar or perform other actions
        this.user = user;
      }
    })

    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
