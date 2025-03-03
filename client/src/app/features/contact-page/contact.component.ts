import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <app-navbar></app-navbar>
    <app-contact-hero></app-contact-hero>
    <main class="min-vh-100 bg-white">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h2 class="text-uppercase small fw-semibold text-success">
            CONTACT US
          </h2>
          <h1 class="mt-2 display-5 fw-bold">
            Connect with Us - We're Here to Help
          </h1>
        </div>

        <div class="row g-4">
          <div class="col-lg-6">
            <app-contact-info></app-contact-info>
          </div>
          <div class="col-lg-6">
            <div class="bg-white rounded shadow-lg p-4">
              <app-contact-form></app-contact-form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .text-success {
      color: #006666 !important;
    }
  `]
})
export class ContactComponent {}