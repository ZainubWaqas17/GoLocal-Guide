import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return true; // Always allows access 
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}

