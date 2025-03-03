import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DialogService } from '../../features/dashboard/services/dialog.service';
import { AuthService } from '../services/auth.services';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.isLoggedIn()) {
      return of(true);
    }

    return this.dialogService.showLoginPrompt('You need to login to access this feature.').pipe(
      switchMap(result => {
        if (result) {
          this.router.navigate(['/auth/login'], {
          });
        }
        return of(false);
      })
    );
  }
}

