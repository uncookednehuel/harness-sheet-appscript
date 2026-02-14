function promptCreateHarness() {
  const C_HARNESS_HEADING = "Creating new harness";

  var name = UI.prompt(
    "Creating new harness",
    "Enter header:",
    UI.ButtonSet.OK_CANCEL
  );

  if (name.getSelectedButton() == UI.Button.CANCEL) {
    return;
  }

  var id = UI.prompt(
    C_HARNESS_HEADING,
    "Enter ID:",
    UI.ButtonSet.OK_CANCEL
  );

  if (id.getSelectedButton() == UI.Button.CANCEL || id == null) {
    return;
  }

  var pinsVal;
  while (true) {
    var pinsQ = UI.prompt(
      C_HARNESS_HEADING,
      "Enter number of pins:",
      UI.ButtonSet.OK_CANCEL
      );

    pinsVal = parseInt(pinsQ.getResponseText());
    
    if (pinsQ.getSelectedButton() == UI.Button.CANCEL) {
      return; 
    }
    
    if (isNaN(pinsVal)) {
      UI.alert("Please enter a valid number.");
      continue;
    }

    if (pinsVal > 1000) {
      UI.alert("Kinda harness you tryna make bruh");
      continue;
    }

    if (pinsVal == 67) {
      UI.alert("get out of here");
    }

    break;
  }

  var pinType = UI.alert(
    C_HARNESS_HEADING,
    "Click Yes for numberic pins, or No for alphebetical pins",
    UI.ButtonSet.YES_NO_CANCEL
  );

  if (pinType == UI.Button.CANCEL) { return; }
  var yaNo = pinType == UI.Button.YES;

  createHarness(name.getResponseText(), id.getResponseText(), pinsVal, yaNo);
}

const WIDTH = 4;

function createHarness(name, id, pins, pinType) {
  Logger.log("Creating harness")

  var rows = [];
  var selected = SHEET.getActiveRange();

  var nameRow = Array(WIDTH);
  nameRow[0] = name;
  nameRow[nameRow.length - 2] = pins;
  nameRow[nameRow.length - 1] = id;
  rows.push(nameRow);
  // TODO this could probably be more efficient
  for (var i = 0; i < pins; i++) {
    var workingRow = Array(WIDTH);
    workingRow[0] = pinType ? i + 1 : ALPHABET[i];
    rows.push(workingRow);
  }

    SHEET.getRange(selected.getRow(), selected.getColumn(), pins + 1, WIDTH).setValues(rows)
      .setBorder(true, true, true, true, false, false, null, SpreadsheetApp.BorderStyle.SOLID_THICK)
      .setBorder(null, null, null, null, true, true)
      .applyRowBanding();
    SHEET.getRange(selected.getRow(), selected.getColumn(), 1, WIDTH).setBackground('#bdbdbd');
}