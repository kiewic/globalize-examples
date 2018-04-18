export class CultureModel {
  patternSelectors: string[];
  formattedDates: {
    [id: string]: {
      pattern?: string;
      example?: string;
    }
  };

  constructor() {
    this.formattedDates = {};
  }
}
