/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
    .addItem('Modify selected chain', 'openDialogue')
    .addItem('Add component starting at selected cell', 'promptCreateHarness')
    .addItem('Add chain', 'createChain')
    .addItem('Test', 'testGetChain')
    // .addItem('Test', 'testSeperateArguments')
    .addSubMenu(importantSubmenu)
    .addToUi();
}

function openDialogue() {
  var html = HtmlService.createHtmlOutputFromFile('ModifyChain');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'Modifying selected chain');
}

// function onEdit(e) {
//   // UI.alert(seperateArguments("44 :: 3 :: 6677 :: 22"));
//   // return;
//   // Only accept single sell edits
//   if (e.value == null && e.oldValue == null) { return; }

//   // disabled for now because we actually don't want it to ripple descriptions
//   if (SHEET.getRange(1, e.range.getColumn()).getValue() == FUNCTION_TEXT && false) {
//     rippleDescription(e)
//   }

//   if (SHEET.getRange(1, e.range.getColumn()).getValue() == PIN_TEXT) {
//     ripplePin(e);
//   }
// }

function gay() {UI.alert("Hahahah you fell for it silly")}