// src/app/shared/shared.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HighlightDirective } from './directives/highight.directive';
import { TitleCasePipe } from './pipes/title-case.pipe';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, TitleCasePipe, HighlightDirective],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, RouterModule, TitleCasePipe,
    HighlightDirective]
})
export class SharedModule { }