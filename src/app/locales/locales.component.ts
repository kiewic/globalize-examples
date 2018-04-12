import { Component, OnInit } from '@angular/core';
import { LocaleComparisons } from './locale-comparison.model';
import { LocaleNameService } from '../locale-name.service'

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  providers: [LocaleNameService],
})
export class LocalesComponent implements OnInit {
  allLocaleNames: string[];
  onlyVersion0LocaleNames: string[]= [];
  bothModernLocaleNames: string[] = [];
  bothFullLocaleNames: string[] = [];
  onlyModernLocaleNames: string[] = [];
  onlyFullLocaleNames: string[] = [];

  private comparisons: LocaleComparisons = {};

  constructor(localeNameService: LocaleNameService) {
    for (const localeName of localeNameService.getVersion0LocalNames()) {
      this.add(localeName, 'version0');
    }
    for (const localeName of localeNameService.getModernLocaleNames()) {
      this.add(localeName, 'modern');
    }
    for (const localeName of localeNameService.getFullLocaleNames()) {
      this.add(localeName, 'full');
    }

    this.allLocaleNames = Object.keys(this.comparisons);

    for (const localeName of this.allLocaleNames) {
      const locale = this.comparisons[localeName];
      if (locale.version0 && !locale.modern && !locale.full) {
        this.onlyVersion0LocaleNames.push(localeName);
      }
      else if (locale.version0 && locale.modern) {
        this.bothModernLocaleNames.push(localeName);
      }
      else if (locale.version0 && locale.full) {
        this.bothFullLocaleNames.push(localeName);
      }
      else if (locale.modern) {
        this.onlyModernLocaleNames.push(localeName);
      }
      else if (locale.full) {
        this.onlyFullLocaleNames.push(localeName);
      }
      else {
        console.error(localeName);
      }
    }
  }

  ngOnInit() {
  }

  private add(localeName: string, prop: string) {
    const comparisons = this.comparisons;
    if (!comparisons[localeName]) {
      comparisons[localeName] = {};
    }
    comparisons[localeName][prop] = true;
  }
}
