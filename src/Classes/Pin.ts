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
/**
 * Represents a pin using only its componentID and the pinAlphaNum
 */
class Pin {
  componentID: string;
  pinAlphaNum: string;

  constructor (componentID: string, pinAlphaNum: string) {
    this.componentID = componentID;
    this.pinAlphaNum = pinAlphaNum;
  }
  
  /**
   * Defines the pin by getting the rest of the info from the spreadsheet and returning a DefinedPin object
   * @return {DefinedPin}
   */
  define(component: Component) {
    const vals = SHEET.getRange(component.row + pinToPinValue(this.pinAlphaNum), component.col - 3, 1, 5).getValues()[0];
    return new DefinedPin(this.componentID, this.pinAlphaNum, vals[1], vals[2], vals[3], vals[4]);
  }
}