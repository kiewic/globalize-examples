import { Component, OnInit } from '@angular/core';
import { LocaleNameBuckets } from './locale-name-buckets.model';
import { LocaleNameService } from '../locale-name.service'
import { HttpClient } from '@angular/common/http';

// Quick and Dirty
declare var Cldr: any;

interface LocaleNamePairs {
  [id: string]: string;
}

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  providers: [LocaleNameService],
})
export class LocalesComponent implements OnInit {
  modern = new LocaleNameBuckets();
  full = new LocaleNameBuckets();
  pairs: LocaleNamePairs = {};

  constructor(private localeNameService: LocaleNameService, httpClient: HttpClient) {
    httpClient.get('/assets/cldr-core/supplemental/likelySubtags.json')
      .subscribe((data: string) => this.compareLocales(data));
  }

  ngOnInit() {
  }

  private compareLocales(likelySubtags: string): void {
    Cldr.load(likelySubtags);
    Cldr.setAvailableBundlesHack = function(availableLocales: string[]) {
      availableLocales.splice(availableLocales.indexOf("root"), 1);
      this._availableBundleMapQueue = availableLocales;
    };
    Cldr.setAvailableBundlesHack(this.localeNameService.getFullLocaleNames());

    this.compare(this.modern, this.localeNameService.getVersion0LocalNames(), this.localeNameService.getModernLocaleNames());
    this.compare(this.full, this.localeNameService.getVersion0LocalNames(), this.localeNameService.getFullLocaleNames());
  }

  private compare(buckets: LocaleNameBuckets, version0: string[], version1: string[]) {
    for (const localeName of version0) {
      const index = version1.indexOf(localeName);
      console.log(localeName, index);
      if (index > -1) {
        version1.splice(index, 1);
        buckets.same.push(localeName);
        continue;
      }

      const likelyName = new Cldr(localeName).attributes.bundle;
      if (likelyName) {
        version1.splice(index, 1);
        buckets.changed.push(localeName);
        this.pairs[localeName] = likelyName;
      }
    }

    for (const localeName of buckets.same) {
      const index = version0.indexOf(localeName);
      if (index > -1) {
        version0.splice(index, 1);
      }
    }

    for (const localeName of buckets.changed) {
      const index = version0.indexOf(localeName);
      if (index > -1) {
        version0.splice(index, 1);
      }
    }

    buckets.added.push(...version1);
    buckets.removed.push(...version0);
  }
}
