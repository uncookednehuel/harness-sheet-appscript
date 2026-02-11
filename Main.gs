const UI = SpreadsheetApp.getUi();
const SHEET = SpreadsheetApp.getActiveSheet();
const SHEET_BREADTH = 15;
const SHEET_DEPTH = 1000;
const FUNCTION_TEXT = "Function";
const PIN_TEXT = "Pin";
const ID_PREFIX = "$";

function onOpen() {
  const submenu = UI.createMenu('are').addItem('gay', 'gay');
  const importantSubmenu = UI.createMenu('You').addSubMenu(submenu);
  UI.createMenu('Harness')
    .addItem('Add harness starting at selected cell', 'promptCreateHarness')
    .addItem('Add chain', 'createChain')
    .addItem('Test', 'testGetChain')
    // .addItem('Test', 'testSeperateArguments')
    .addSubMenu(importantSubmenu)
    .addToUi();
}

function gay() {UI.alert("Hahahah you fell for it silly")}

function onEdit(e) {
  // UI.alert(seperateArguments("44 :: 3 :: 6677 :: 22"));
  // return;
  // Only accept single sell edits
  if (e.value == null && e.oldValue == null) { return; }

  // disabled for now because we actually don't want it to ripple descriptions
  if (SHEET.getRange(1, e.range.getColumn()).getValue() == FUNCTION_TEXT && false) {
    rippleDescription(e)
  }

  if (SHEET.getRange(1, e.range.getColumn()).getValue() == PIN_TEXT) {
    ripplePin(e);
  }
}