class Chain {
  constructor () {
    this.pins = new Array();
  }

  /**
   * Writes the chain to the speadsheet
   */
  burnChain() {}

  toString() {
    let str = "Tos: {"
    this.pins.forEach(function(val, i, arr) { str += (val.componentID + (i == arr.length - 1 ? "" : " :: "))});
    str += "} To pins: {";
    this.pins.forEach(function(val, i, arr) { str += (val.pinName + (i == arr.length - 1 ? "" : " :: "))});
    str += "}";
    return str;
  }
}
