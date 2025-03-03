// src/app/pages/about/about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="min-vh-100 bg-gradient">
      <app-navbar></app-navbar>
      <app-hero></app-hero>
      <app-mission></app-mission>
      <app-quote></app-quote>
      <app-team></app-team>
      <app-journey></app-journey>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .bg-gradient {
      background: linear-gradient(180deg, #EFF6FF 0%, #ECFDF5 100%);
    }
  `]
})
export class AboutComponent {}