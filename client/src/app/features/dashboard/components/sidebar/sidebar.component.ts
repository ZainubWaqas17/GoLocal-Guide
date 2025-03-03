import { Component } from '@angular/core';
import {
  Router
} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  exact?:boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-house', route: '/dashboard', exact: true },
    { label: 'Discover', icon: 'bi-compass', route: '/dashboard/discover' },
    { label: 'Booking', icon: 'bi-calendar-week', route: '/dashboard/booking-history' },
    { label: 'Favorite', icon: 'bi-heart', route: '/dashboard/favorite' },
    { label: 'Profile', icon: 'bi-gear', route: '/dashboard/Profile' }
  ];

  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    // Subscribe to the login state from AuthService
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}

