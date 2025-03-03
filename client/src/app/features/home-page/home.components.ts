// pages/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-features></app-features>
    <app-user-types></app-user-types>
    <app-call-to-action></app-call-to-action>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}