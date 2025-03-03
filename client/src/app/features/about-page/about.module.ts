// src/app/core/features/about/about.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { HeroComponent } from './components/hero/hero.component';
import { JourneyComponent } from './components/journey/journey.component';
import { MissionComponent } from './components/mission/mission.component';
import { QuoteComponent } from './components/quote/quote.component';
import { TeamComponent } from './components/team/team.component';
 

@NgModule({
  declarations: [
    AboutComponent,
    HeroComponent,
    MissionComponent,
    QuoteComponent,
    TeamComponent,
    JourneyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule,
  ],
  exports: [AboutComponent]
})
export class AboutModule { }