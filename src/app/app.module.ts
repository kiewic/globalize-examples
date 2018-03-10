import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Example0Component } from './example0/example0.component';
import { Example1Component } from './example1/example1.component';


@NgModule({
  declarations: [
    AppComponent,
    Example0Component,
    Example1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
