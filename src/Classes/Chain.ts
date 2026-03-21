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
   * Burns the chain to the speadsheet
   */
  burnChain(): void {
    this.pins.forEach((pin) => {
      pin.tos = this.pins.map((p) => p.componentID).join(', ');
      pin.toPins = this.pins.map((p) => p.pinAlphaNum).join(', ');
    });
  }

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
