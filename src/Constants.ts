export const UI = SpreadsheetApp.getUi();
export const SHEET = SpreadsheetApp.getActiveSheet();
export const SHEET_BREADTH = 15;
export const SHEET_DEPTH = 1000;
export const FUNCTION_TEXT = "Function";
export const PIN_TEXT = "Pin";
export const ID_PREFIX = "$";

export const ALPHABET = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))  // a–z
];