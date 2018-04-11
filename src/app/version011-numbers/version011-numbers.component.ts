import { Component, OnInit } from '@angular/core';

// Quick and Dirty
declare var Globalize: any;

@Component({
  selector: 'app-version011-numbers',
  templateUrl: './version011-numbers.component.html',
  styleUrls: ['./version011-numbers.component.css']
})
export class Version011NumbersComponent implements OnInit {
  cultureSelectors: string[];
  numberFormats: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.cultureSelectors = Object.keys(Globalize.cultures);

    for (const cultureSelector of this.cultureSelectors) {
      this.numberFormats[cultureSelector] = Globalize.culture(cultureSelector).numberFormat;
    }
  }
}
