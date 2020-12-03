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

type PharmaciesSuggestion = MedicinesSuggestion;

export interface Pharmacy extends PharmaciesSuggestion {
  PHONES: string;
  ADDRESS: string;
  LATITUDE?: number;
  LONGITUDE?: number;
}

export interface VCombobox extends Vue {
  blur(): void;
}
