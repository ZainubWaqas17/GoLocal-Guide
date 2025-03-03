import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardMainpageComponent } from './components/main-page/dashboard-mainpage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';


import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingComponent } from './components/booking/booking.component';
import { DestinationDetailsComponent } from './components/destination-details/destination-details.component';
import { LoginPromptComponent } from './components/login-prompt/login-prompt.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    DashboardMainpageComponent,
    DestinationDetailsComponent,
    BookingConfirmationComponent,
    BookingFormComponent,
    BookingComponent,
    ProfileComponent,
    LoginPromptComponent
  ],
  imports: [
    DashboardRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [DashboardComponent],
  providers: [DatePipe]
})
export class DashboardModule { }