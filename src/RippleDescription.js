function rippleDescription(e) {
  var to = SHEET.getRange(range.getRow(), range.getColumn() - 2).getValue();
  var toPin = SHEET.getRange(range.getRow(), range.getColumn() - 1).getValue();
  if (to == null || toPin == null) { return; }

  var firstRow = SHEET.getRange(1, 1, 1, SHEET_BREADTH).getValues();
  firstRow.forEach(function(val, col) {
    if (val == FUNCTION_TEXT) {
      var cols = SHEET.getRange(2, col, 200, 1).getValues();
      var i = 1;
      while (i < cols.length && cols[i][0] != to) { i++; }
      if (i == cols.length) { UI.alert("Could not find harness with that ID"); return; }

      SHEET.getRange(i + parseInt(toPin) + 2, col).setValue(e.range.getValue());
    }
    col++;
  });
}
