class Chain {
  pins: Array<DefinedPin>;

  constructor() {
    this.pins = [];
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
    let str = "IDs: {"
    this.pins.forEach(function(val, i, arr) { str += (val.componentID + (i == arr.length - 1 ? "" : " :: "))});
    str += "} Pins values: {";
    this.pins.forEach(function(val, i, arr) { str += (val.pinAlphaNum + (i == arr.length - 1 ? "" : " :: "))});
    str += "}";
    return str;
  }
}
