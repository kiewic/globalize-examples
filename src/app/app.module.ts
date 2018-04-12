import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Version011DatesComponent } from './version011-dates/version011-dates.component';
import { Version130DatesComponent } from './version130-dates/version130-dates.component';
import { Version011NumbersComponent } from './version011-numbers/version011-numbers.component';
import { LocalesComponent } from './locales/locales.component';


@NgModule({
  declarations: [
    AppComponent,
    Version011DatesComponent,
    Version130DatesComponent,
    Version011NumbersComponent,
    LocalesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
