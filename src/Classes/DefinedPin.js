/**
 * Represents a pin entry in a component, e.g. pin value, the Tos in the chain, To Pins, Function, and so on
 */
class DefinedPin extends Pin {
  /**
   * Creates a defined pin. TODO will need to make two constructors for the different typs of pin formats (traditional vs new) and also change what info is stored
   */
  constructor(componentID, pinAlphaNum, tos, toPins, func, wireColour) {
    super(componentID, pinAlphaNum);
    this.tos = tos;
    this.toPins = toPins;
    this.func = func;
    this.wireColour = wireColour;
  }

  // Bloody monster
  getChain() {
    const globalComponents = Component.getAllComponentsMap();
    let chain = new Chain();

    if (!this.tos.includes(".")) {
      // Traditional notation, althoguh the cells would be different anyway so I don't know how we would even handle that
      const thisTos = seperateArguments(this.tos);
      const lastPin = globalComponents.get(thisTos.at(-1)).getDefinedPin(seperateArguments(this.toPins).at(-1));
      if (seperateArguments(lastPin.tos).length == thisTos.length) {
        // If they are a duple chain
        if (thisTos.length == 1) {
          chain.pins.push(this, lastPin);
          return chain;
        }

        const nextPin = globalComponents.get(thisTos.at(0)).getDefinedPin(seperateArguments(this.toPins).at(0));
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
    return "Pin(compID: " + this.componentID + ", pinName: " + this.pinAlphaNum + ", tos: " + this.tos +
    ", toPins: " + this.toPins + ", func: " + this.func + ", wireColour: " + this.wireColour + ")";
  }
}