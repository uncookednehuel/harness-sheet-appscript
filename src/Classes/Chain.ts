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
class Chain {
  pins: Array<DefinedPin>;

  constructor() {
    this.pins = [];
  }

  /**
   * Zips a chain together given an array of component IDs and an array of pin alphanumericals
   * @param tos 
   * @param toPins 
   * @returns 
   */
  static zipChain(tos: string[], toPins: string[]): Chain | undefined {
    if (tos.length !== toPins.length) {
      return undefined;
    }

    let global: Map<string, Component> = Component.getAllComponentsMap();
    
    const newChain = new Chain();
    for (let i = 0; i < Math.max(tos.length, toPins.length); i++) {
      if (!tos[i] || !toPins[i])
        Logger.log(`There is an undefined value at index ${i}, tos[i]: ${tos[i]}, toPins[i]: ${toPins[i]}`);
      const pin: DefinedPin | undefined = global.get(tos[i])?.getDefinedPin(toPins[i]);
      if (pin) {
        newChain.pins.push(pin);
      } else {
        Logger.log('Could not find pin ' + toPins[i] + ' on component ' + tos[i]);
        return undefined;
      }
    }
    return newChain;
  }

  /**
   * Writes the chain to the speadsheet
   */
  burnChain(): void {}

  /**
   * Returns string representation of the chain
   * @returns {string}
   */
  toString(): string {
    let str = 'IDs: {';
    this.pins.forEach((val, i, arr) => {
      str += val.componentID + (i === arr.length - 1 ? '' : ' :: ');
    });
    str += '} Pins values: {';
    this.pins.forEach((val, i, arr) => {
      str += val.pinAlphaNum + (i === arr.length - 1 ? '' : ' :: ');
    });
    str += '}';
    return str;
  }
}
