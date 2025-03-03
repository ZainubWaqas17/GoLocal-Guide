import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})


export class NavbarComponent {
  isMenuOpen = false;
  menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/dashboard' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }
}

