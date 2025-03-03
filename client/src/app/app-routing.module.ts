// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guards';
// import { PublicGuard } from './core/guards/public.guard';
// import { AboutComponent } from './features/about-page/about.component';
// import { AuthComponent } from './features/auth/auth.component';
// import { LoginComponent } from './features/auth/components/login/login.component';
// import { SignupComponent } from './features/auth/components/signup/signup.component';
// import { ContactComponent } from './features/contact-page/contact.component';
// import { BookingConfirmationComponent } from './features/dashboard/components/booking-confirmation/booking-confirmation.component';
// import { BookingFormComponent } from './features/dashboard/components/booking-form/booking-form.component';
// import { BookingComponent } from './features/dashboard/components/booking/booking.component';
// import { DestinationDetailsComponent } from './features/dashboard/components/destination-details/destination-details.component';
// import { DashboardMainpageComponent } from './features/dashboard/components/main-page/dashboard-mainpage.component';
// import { ProfileComponent } from './features/dashboard/components/profile/profile.component';
// import { DashboardComponent } from './features/dashboard/dashboard.component';
// import { HomeComponent } from './features/home-page/home.components';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },
//   {
//     path: 'auth',
//     component: AuthComponent,
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'signup', component: SignupComponent },
//     ],
//   },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     children: [
//       { 
//         path: '', 
//         component: DashboardMainpageComponent,
//         canActivate: [PublicGuard]
//       },
//       { 
//         path: 'destination/:id', 
//         component: DestinationDetailsComponent,
//         canActivate: [PublicGuard]
//       },
//       { 
//         path: 'booking/:id', 
//         component: BookingFormComponent,
//         canActivate: [AuthGuard]
//       },
//       { 
//         path: 'booking-confirmation', 
//         component: BookingConfirmationComponent,
//         canActivate: [AuthGuard]
//       },
//       { 
//         path: 'booking-history', 
//         component: BookingComponent,
//         canActivate: [AuthGuard]
//       },
//       { 
//         path: 'Profile', 
//         component: ProfileComponent,
//         canActivate: [AuthGuard]
//       },
//     ],
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home-page/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./features/about-page/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./features/contact-page/contact.module').then(m => m.ContactModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

