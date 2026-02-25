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

import { UI, SHEET, SHEET_BREADTH, SHEET_DEPTH, FUNCTION_TEXT, PIN_TEXT, ID_PREFIX, ALPHABET } from './Constants';

/**
 * Converts a pin alphanumerical (A, B, 1, 2) to a pin value (1, 2, 3).
 */
export function pinToPinValue(en: string): number {
  var parsed = parseInt(en);
  if (!Number.isNaN(parsed)) { return parsed; }

  var index = ALPHABET.indexOf(en);
  if (index != -1) { return index + 1; }

  //UI.alert("Invalid pin name");
  Logger.log("Invalid pin name: " + en);
  UI.alert("Invalid pin name: " + en);
  return -1;
}

/**
 * Returns every other word (0-based indices 0, 2, 4, ...) from the input string.
 */
export function seperateArguments(en: string): string[] {
  return en ? en.trim().split(/\s+/).filter((element, i) => { return i % 2 === 0; }) : [];
  //return en.split(" :: ");
}

/**
 * Gets the suffix of a number, e.g. st for 1, nd for 2, rd for 3, th for 4 and so on. Used for UI purposes.
 */
export function suffixOfNumber(val: number): string {
  var m = val % 100;
  return m == 1 ? "st " : (m == 2 ? "nd " : (m == 3 ? "rd " : "th "));
}

/**
 * Finds the cells corresponding to a list of IDs. Inefficient and not updated to class format.
 * 
 * @deprecated Since move to classes.
 */
export function findIdCells(ids: string[]): GoogleAppsScript.Spreadsheet.Range[] {
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