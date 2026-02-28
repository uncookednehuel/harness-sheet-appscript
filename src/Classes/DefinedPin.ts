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
 * Represents a pin entry in a component, e.g. pin value, the Tos in the chain, To Pins, Function, and so on
 */
class DefinedPin extends Pin {
  tos: string;
  toPins: string;
  func: string;
  wireColour: string;
  /**
   * Creates a defined pin. TODO will need to make two constructors for the different typs of pin formats (traditional vs new) and also change what info is stored
   */
  constructor(
    componentID: string,
    pinAlphaNum: string,
    tos: string,
    toPins: string,
    func: string,
    wireColour: string
  ) {
    super(componentID, pinAlphaNum);
    this.tos = tos;
    this.toPins = toPins;
    this.func = func;
    this.wireColour = wireColour;
  }

  // Bloody monster
  getChain(): Chain | undefined {
    const globalComponents = Component.getAllComponentsMap();
    if (globalComponents.size == 0) {
      UI.alert('No components found in sheet');
      return undefined;
    }
    const chain = new Chain();

    if (!this.tos.includes('.')) {
      // Traditional notation, althoguh the cells would be different anyway so I don't know how we would even handle that
      const thisTos: string[] = seperateArguments(this.tos);

      const thisTosAtLast = thisTos[thisTos.length - 1];
      if (thisTosAtLast == undefined) {
        UI.alert('Error: thisTosAtOne is undefined');
        return undefined;
      }

      const thisToPins = seperateArguments(this.toPins);
      const thisToPinsAtLast = thisToPins[thisToPins.length - 1];
      if (thisToPinsAtLast == undefined) {
        UI.alert('Error: thisToPinsAtLast is undefined');
        return undefined;
      }

      const lastPin = globalComponents
        .get(thisTosAtLast)
        ?.getDefinedPin(thisToPinsAtLast);
      if (lastPin == undefined) {
        UI.alert('Error: lastPin is undefined');
        return undefined;
      }
      if (seperateArguments(lastPin.tos).length == thisTos.length) {
        // If they are a duple chain
        if (thisTos.length == 1) {
          chain.pins.push(this, lastPin);
          return chain;
        }

        const thisTosAtZero = thisTos[0];
        if (thisTosAtZero == undefined) {
          UI.alert('Error: thisTosAtZero is undefined');
          return undefined;
        }

        const thisToPinsAtZero = seperateArguments(this.toPins)[0];
        if (thisToPinsAtZero == undefined) {
          UI.alert('Error: thisToPinsAtZero is undefined');
          return undefined;
        }

        const nextPin = globalComponents
          .get(thisTosAtZero)
          ?.getDefinedPin(thisToPinsAtZero);
        if (nextPin == undefined) {
          UI.alert('Error: nextPin is undefined');
          return undefined;
        }

        if (seperateArguments(nextPin.tos)[0] == this.componentID) {
          // then we are in the end of the chain
        }
      }
    }

    return chain;
    // boom blyat cyka done!
  }

  /**
   * Returns string representation
   * @return {String}
   */
  toString() {
    return (
      'Pin(compID: ' +
      this.componentID +
      ', pinName: ' +
      this.pinAlphaNum +
      ', tos: ' +
      this.tos +
      ', toPins: ' +
      this.toPins +
      ', func: ' +
      this.func +
      ', wireColour: ' +
      this.wireColour +
      ')'
    );
  }
}
