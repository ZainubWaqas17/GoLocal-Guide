import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guards';
import { PublicGuard } from '../../core/guards/public.guard';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingComponent } from './components/booking/booking.component';
import { DestinationDetailsComponent } from './components/destination-details/destination-details.component';
import { DashboardMainpageComponent } from './components/main-page/dashboard-mainpage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardMainpageComponent, canActivate: [PublicGuard] },
      { path: 'destination/:id', component: DestinationDetailsComponent, canActivate: [PublicGuard] },
      { path: 'booking/:id', component: BookingFormComponent, canActivate: [AuthGuard] },
      { path: 'booking-confirmation', component: BookingConfirmationComponent, canActivate: [AuthGuard] },
      { path: 'booking-history', component: BookingComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
