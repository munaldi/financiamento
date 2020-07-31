import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InstallmentsComponent } from './installments/installments.component';
import { DropdownDirective } from "./shared/dropdown.directive";
import { ParametersComponent } from './parameters/parameters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InstallmentsComponent,
    DropdownDirective,
    ParametersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
