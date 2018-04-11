import { Component, OnInit } from '@angular/core';
import { CultureModel } from './shared/culture.model'

// Quick and Dirty
declare var Globalize: any;

@Component({
  selector: 'app-version011-dates',
  templateUrl: './version011-dates.component.html',
  styleUrls: ['./version011-dates.component.css']
})
export class Version011DatesComponent implements OnInit {

  cultureSelectors: string[];
  cultures: { [id: string]: CultureModel };

  constructor() { }

  ngOnInit() {
    this.cultureSelectors = Object.keys(Globalize.cultures);
    this.cultures = {};
    this.formatNumber();
    this.formatDate();
  }

  formatNumber(): void {
    const differentValues = [];
    for (const cultureSelector of this.cultureSelectors) {
      let val = Globalize.format(1234567.1234567, 'n', Globalize.culture(cultureSelector));
      if (!differentValues.includes(val)) {
        differentValues.push(val);
      }
    }
    console.log(differentValues);
  }

  formatDate(): void {
    let myDate = new Date();
    for (const cultureSelector of this.cultureSelectors) {
      const culture = Globalize.culture(cultureSelector);
      const cultureModel = this.cultures[cultureSelector] = new CultureModel();
      const patternSelectors = cultureModel.patternSelectors = Object.keys(culture.calendar.patterns);
      const results = cultureModel.formattedDates = {};
      for (const patternSelector of patternSelectors) {
        results[patternSelector] = Globalize.format(myDate, patternSelector, culture);
      }
    }
  }

}
