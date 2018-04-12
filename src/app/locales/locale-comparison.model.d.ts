// TODO: Is it ok to have only an export interface in a file? Why did I had to add `*.d.ts` extension?
export interface LocaleComparisons {
    [id: string]: {
        version0?: boolean;
        modern?: boolean;
        full?: boolean;
    }
}
