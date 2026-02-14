const ALPHABET = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))  // a–z
];

/**
 * Converts a pin alphanumerical (A, B, 1, 2) to a pin value (1, 2, 3).
 */
function pinToPinValue(en: string): number | null {
  var parsed = parseInt(en);
  if (!Number.isNaN(parsed)) { return parsed; }

  var index = ALPHABET.indexOf(en);
  if (index != -1) { return index + 1; }

  //UI.alert("Invalid pin name");
  Logger.log("Invalid pin name: " + en);
  UI.alert("Invalid pin name: " + en);
  return null;
}

/**
 * Returns every other word (0-based indices 0, 2, 4, ...) from the input string.
 */
function seperateArguments(en: string): string[] {
  return en ? en.trim().split(/\s+/).filter((element, i) => { return i % 2 === 0; }) : [];
  //return en.split(" :: ");
}

/**
 * Gets the suffix of a number, e.g. st for 1, nd for 2, rd for 3, th for 4 and so on. Used for UI purposes.
 */
function suffixOfNumber(val: number): string {
  var m = val % 100;
  return m == 1 ? "st " : (m == 2 ? "nd " : (m == 3 ? "rd " : "th "));
}

/**
 * Finds the cells corresponding to a list of IDs. Inefficient and not updated to class format.
 * 
 * @deprecated Since move to classes.
 */
function findIdCells(ids: string[]): GoogleAppsScript.Spreadsheet.Range[] {
  var cells = new Array(ids.length);
  SHEET.getRange(1, 1, 1, SHEET_BREADTH).getValues()[0].forEach(function(val, col) {
      if (val == FUNCTION_TEXT) {
        SHEET.getRange(2, col + 1, SHEET_DEPTH, 1).getValues().forEach(function(val2, row) {
          const index = ids.indexOf(ID_PREFIX + val2[0]);
          if (index != -1) {
            cells[index] = SHEET.getRange(row + 2, col + 1, 1, 1);
          }
        });
      }
    });
  return cells;
}