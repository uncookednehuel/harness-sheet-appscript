const ALPHABET = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))  // a–z
];

function pinToPinValue(en) {
  var parsed = parseInt(en);
  if (!Number.isNaN(parsed)) { return parsed; }

  var index = ALPHABET.indexOf(en);
  if (index != -1) { return index + 1; }

  //UI.alert("Invalid pin name");
  return null;
}

function seperateArguments(en) {
  return en.split(" ").filter((element, i) => { return i % 2 === 0; });
  //return en.split(" :: ");
}

function suffixOfNumber(val) {
  var m = val % 100;
  return m == 1 ? "st " : (m == 2 ? "nd " : (m == 3 ? "rd " : "th "));
}

function findIdCells(ids) {
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