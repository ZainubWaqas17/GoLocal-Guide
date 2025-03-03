// src/app/features/home-page/home.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { FeaturesComponent } from './components/features/features.components';
import { HeroComponent } from './components/hero/hero.component';
import { UserTypesComponent } from './components/user-types/user-types.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.components';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    FeaturesComponent,
    UserTypesComponent,
    CallToActionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HomeRoutingModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }