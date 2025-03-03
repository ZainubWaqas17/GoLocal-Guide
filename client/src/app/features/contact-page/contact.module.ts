// src/app/features/home-page/home.module.ts

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ContactHeroComponent } from "../contact-page/components/hero/hero.component";
import { ContactFormComponent } from "./components/form/form.component";
import { ContactInfoComponent } from "./components/info/info.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactComponent } from "./contact.component";

@NgModule({
  declarations: [
    ContactComponent,
    ContactHeroComponent,
    ContactFormComponent,
    ContactInfoComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ],
  exports: [ContactComponent]
})
export class ContactModule { }