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

export interface VCombobox extends Vue {
  blur(): void;
}
