import { Component, OnInit } from '@angular/core';

// Quick and Dirty
declare var Globalize: any;

class CultureModel {
  patternSelectors: string[];
  formattedDates: { [id: string]: string };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cultureSelectors: string[];
  cultures: { [id: string]: CultureModel };

  ngOnInit() {
    this.cultures = {};
    this.cultureSelectors = Object.keys(Globalize.cultures);
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

  demoFun(): void {
    console.log("Hello!");
  }
}
