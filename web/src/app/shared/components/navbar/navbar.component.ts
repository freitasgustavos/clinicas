import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User, AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  isLogout = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$();
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.isLogout = true;
    this.authService.logout().subscribe({
      next: () => {
        this.isLogout = false;
      },
      error: (error) => {
        console.error('Logout failed', error);
        this.isLogout = false;
      },
    });
  }
}
