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

function promptCreateHarness() {
  const C_HARNESS_HEADING = 'Creating new harness';

  const name = UI.prompt(
    'Creating new harness',
    'Enter header:',
    UI.ButtonSet.OK_CANCEL
  );

  if (name.getSelectedButton() === UI.Button.CANCEL) {
    return;
  }

  const id = UI.prompt(C_HARNESS_HEADING, 'Enter ID:', UI.ButtonSet.OK_CANCEL);

  if (id.getSelectedButton() === UI.Button.CANCEL || id === null) {
    return;
  }

  let pinsVal;
  while (true) {
    const pinsQ = UI.prompt(
      C_HARNESS_HEADING,
      'Enter number of pins:',
      UI.ButtonSet.OK_CANCEL
    );

    pinsVal = parseInt(pinsQ.getResponseText());

    if (pinsQ.getSelectedButton() === UI.Button.CANCEL) {
      return;
    }

    if (isNaN(pinsVal)) {
      UI.alert('Please enter a valid number.');
      continue;
    }

    if (pinsVal > 1000) {
      UI.alert('Kinda harness you tryna make bruh');
      continue;
    }

    if (pinsVal === 67) {
      UI.alert('get out of here');
    }

    break;
  }

  const pinType = UI.alert(
    C_HARNESS_HEADING,
    'Click Yes for numberic pins, or No for alphebetical pins',
    UI.ButtonSet.YES_NO_CANCEL
  );

  if (pinType === UI.Button.CANCEL) {
    return;
  }
  const yaNo = pinType === UI.Button.YES;

  createHarness(name.getResponseText(), id.getResponseText(), pinsVal, yaNo);
}

const WIDTH = 4;

function createHarness(
  name: string,
  id: string,
  pins: number,
  pinType: boolean
) {
  Logger.log('Creating harness');

  const rows = [];
  const selected = SHEET.getActiveRange();

  const nameRow = Array(WIDTH);
  nameRow[0] = name;
  nameRow[nameRow.length - 2] = pins;
  nameRow[nameRow.length - 1] = id;
  rows.push(nameRow);
  // TODO this could probably be more efficient
  for (let i = 0; i < pins; i++) {
    const workingRow = Array(WIDTH);
    workingRow[0] = pinType ? i + 1 : ALPHABET[i];
    rows.push(workingRow);
  }
  if (selected !== null) {
    // <--- Owen retard code (dont trust)
    SHEET.getRange(selected.getRow(), selected.getColumn(), pins + 1, WIDTH)
      .setValues(rows)
      .setBorder(
        true,
        true,
        true,
        true,
        false,
        false,
        null,
        SpreadsheetApp.BorderStyle.SOLID_THICK
      )
      .setBorder(null, null, null, null, true, true)
      .applyRowBanding();
    SHEET.getRange(
      selected.getRow(),
      selected.getColumn(),
      1,
      WIDTH
    ).setBackground('#bdbdbd');
  }
}
