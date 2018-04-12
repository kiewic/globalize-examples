import { Component, OnInit } from '@angular/core';
import { LocaleComparisons } from './locale-comparison.model';
import { LocaleNameService } from '../locale-name.service'
import { HttpClient } from '@angular/common/http';

// Quick and Dirty
declare var Cldr: any;

interface LocaleNamePair {
  name: string;
  likelyName?: string;
}

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  providers: [LocaleNameService],
})
export class LocalesComponent implements OnInit {
  allLocaleNames: string[];
  onlyVersion0LocaleNames: LocaleNamePair[]= [];
  bothModernLocaleNames: string[] = [];
  bothFullLocaleNames: string[] = [];
  onlyModernLocaleNames: string[] = [];
  onlyFullLocaleNames: string[] = [];

  private comparisons: LocaleComparisons = {};

  constructor(localeNameService: LocaleNameService, httpClient: HttpClient) {
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
        this.onlyVersion0LocaleNames.push({ name: localeName });
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

    httpClient.get('/assets/cldr-core/supplemental/likelySubtags.json')
      .subscribe((data: string) => this.loadCldr(data, localeNameService));
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

  private loadCldr(likelySubtags: string, localeNameService: LocaleNameService) {
    Cldr.load(likelySubtags);

    Cldr.setAvailableBundlesHack = function(availableLocales: string[]) {
      availableLocales.splice(availableLocales.indexOf("root"), 1);
      this._availableBundleMapQueue = availableLocales;
    };

    Cldr.setAvailableBundlesHack(localeNameService.getFullLocaleNames());

    for (const onlyVersion0Locale of this.onlyVersion0LocaleNames) {
      onlyVersion0Locale.likelyName = new Cldr(onlyVersion0Locale.name).attributes.bundle;
    }
  }
}
