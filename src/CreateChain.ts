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

import { UI, SHEET } from './Constants';
import { suffixOfNumber, findIdCells, pinToPinValue } from './Helpers';

export function createChain() {
  const C_CHAIN_HEADING = "Creating new chain...";
  var ids: string[] = [];
  var idCells: GoogleAppsScript.Spreadsheet.Range[] = [];
  var pins: string[] = [];

  var i = 1;
  var idResponse;
  var idResponseText;
  var idCell;
  var pinResponse;
  var pinResponseNum;
  var pinResponseMax;
  // Should make a list of valid IDs at the beginning and just use that instead of checking per ID entry
  while (true) {
    // Obtain ID
    idResponse = UI.prompt(
      C_CHAIN_HEADING,
      "Enter " + i + suffixOfNumber(i) + " component ID",
      UI.ButtonSet.OK_CANCEL
    );
    
    if (idResponse.getSelectedButton() == UI.Button.CANCEL) { return; }

    idResponseText = idResponse.getResponseText();
    idCell = findIdCells([idResponseText]);
    if (idResponseText == null || idCell[0] == null) {
      UI.alert("Could not find ID");
      continue;
    }
    
    // Obtain pin
    pinResponse = UI.prompt(
      C_CHAIN_HEADING,
      "Enter " + i + suffixOfNumber(i) + " component pin",
      UI.ButtonSet.OK_CANCEL
    );
    
    if (pinResponse.getSelectedButton() == UI.Button.CANCEL) { return; }

    pinResponseNum = pinToPinValue(pinResponse.getResponseText());
    if (pinResponseNum == null) {
      UI.alert("Invalid pin format");
      continue;
    }

    // TODO this might be cooked
    pinResponseMax = SHEET.getRange(idCell[0].getRow(), idCell[0].getColumn() - 1).getValue();
    if (!(typeof pinResponseMax === 'number') || isNaN(pinResponseMax)) {
      UI.alert("This component has an invalid pin quantity entry");
      continue;
    }
    if (pinResponseNum > pinResponseMax) {
      UI.alert("Mrk the pin you entered is out of range of this component");
      continue;
    }

    ids.push(idResponseText);
    idCells.push(idCell[0]);
    pins.push(pinResponse.getResponseText());

    let another = UI.alert(
      C_CHAIN_HEADING,
      "Do you want to add another component to this chain?",
      UI.ButtonSet.YES_NO_CANCEL
    );

    if (another == UI.Button.NO) { break; }
    if (another == UI.Button.CANCEL) { return; }
    i++;
  }
  // Maybe a prompt at the end to ask for function description or something like that
  UI.alert("We have created a chain of: " + idCells + " and vittu voi " + pins + " and pins numbers " + pins.map(function(val) {return pinToPinValue(val);}));

  // Now actually create it rollo
  idCells.forEach(function(val, i, arr) {
    let idsText;
    let pinsText;
    if (i != arr.length - 1) {
      idsText = ids.slice(i + 1).join(" :: ");
      pinsText = pins.slice(i + 1).join(" :: ");
    } else {
      const idsReversed = [...ids].reverse();
      const pinsReversed = [...pins].reverse();
      idsText = idsReversed.slice(1).join(" :: ");
      pinsText = pinsReversed.slice(1).join(" :: ");
    }

    SHEET.getRange(val.getRow() + pinToPinValue(pins[i]), val.getColumn() - 2, 1, 2).setValues([[idsText, pinsText]]);
  });
}