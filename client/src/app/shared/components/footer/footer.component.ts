// components/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  socialLinks = [
    { icon: 'bi bi-facebook', url: 'https://facebook.com/golocalguide' },
    { icon: 'bi bi-twitter', url: 'https://twitter.com/golocalguide' },
    { icon: 'bi bi-instagram', url: 'https://instagram.com/golocalguide' },
    { icon: 'bi bi-linkedin', url: 'https://linkedin.com/company/golocalguide' }
  ];
}