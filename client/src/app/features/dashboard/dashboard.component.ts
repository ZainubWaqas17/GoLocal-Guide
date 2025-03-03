import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-dashboard',
  template: `

    <div class="dashboard-container">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
  @import '@angular/material/prebuilt-themes/indigo-pink.css';
    .dashboard-container {
      display: flex;
      height: 100vh;
    }
    .main-content {
      flex-grow: 1;
      margin-left: 280px; /* Width of the sidebar */
      padding: 2rem;
      overflow-y: auto;
    }
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userName = currentUser.name;
    }
  }
}

