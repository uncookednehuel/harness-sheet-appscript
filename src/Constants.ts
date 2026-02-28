const UI = SpreadsheetApp.getUi();
const SHEET = SpreadsheetApp.getActiveSheet();
const SHEET_BREADTH = 15;
const SHEET_DEPTH = 1000;
const FUNCTION_TEXT = 'Function';
const PIN_TEXT = 'Pin';
const ID_PREFIX = '$';

const ALPHABET = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a–z
];
