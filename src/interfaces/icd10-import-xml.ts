export interface Icd10ImportXml {
  DSV: Icd10DSV;
}

interface Icd10DSV {
  xmlns: string;
  'xsi:schemaLocation': string;
  'xmlns:xsi': string;
  CLASS: Array<Icd10Class>;
}

interface Icd10Class {
  CODE: string;
  ALT_CODE: string;
  USAGE: 'ASTERISK' | 'DAGGER' | 'DEFAULT';
  USAGE_UK: string;
  DESCRIPTION: string;
  QUALIFIERS?: string;
  GENDER_MASK?: 1 | 2;
  MIN_AGE?: number;
  MAX_AGE?: number;
  TREE_DESCRIPTION?: string;
}
