import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Version011DatesComponent } from './version011-dates/version011-dates.component';
import { Version130DatesComponent } from './version130-dates/version130-dates.component';


@NgModule({
  declarations: [
    AppComponent,
    Version011DatesComponent,
    Version130DatesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
