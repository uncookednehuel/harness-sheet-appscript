function ripplePin(e) {
  var componentValues = SHEET.getRange(e.range.getRow(), e.range.getColumn() - 2, 1, 4).getValues();
  // Array of pins in order of appearance (1 :: 3 :: 9)
  var newPins = seperateArguments(componentValues[0][2]);
  var oldPins = seperateArguments(e.oldValue);
  // Array of IDs that the pins are of in order of appearance (VITTI :: PERKELE :: VITTU)
  var editedTos = seperateArguments(componentValues[0][1]);

  // Operating on the Range objects returned by the function
  findIdCells(editedTos).forEach(function(val, i, arr) {
    // Have to offset by pin number, detect if there are things there, and then change it and depending on the order of the values, and index; Perkele racing.
    if (i < arr.length) {
      
    }
  });
}

// Need to have a starting cell, get list of IDs, then parse them, then reverse parse of last cell and skip over already scanned cells and
// push new ones
function parseArrays() {

}