export interface MedicinesSuggestion {
  ID: number;
  TITLE: string;
  SCORE: number;
}

export interface Medicine extends MedicinesSuggestion {
  STATUS: string;
  PRICE: number;
  AVAILABLE: number;
}

export type PharmaciesSuggestion = MedicinesSuggestion;

export interface Pharmacy extends PharmaciesSuggestion {
  PHONES: string;
  ADDRESS: string;
  LATITUDE?: number;
  LONGITUDE?: number;
}

export type PostsSuggestion = MedicinesSuggestion;

export interface Post extends PharmaciesSuggestion {
  STATUS: string;
  STORAGE: string;
  EXPIRES: string;
  CONTACTS: string;
  POST_STATUS: string;
}

export interface VCombobox extends Vue {
  blur(): void;
}
export interface VForm extends Vue {
  validate(): boolean;
}
