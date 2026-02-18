/**
 * Represents a pin entry in a component, e.g. pin value, the Tos in the chain, To Pins, Function, and so on
 */
class DefinedPin extends Pin {
  tos: string;
  toPins: string
  func: string;
  wireColour: string;
  /**
   * Creates a defined pin. TODO will need to make two constructors for the different typs of pin formats (traditional vs new) and also change what info is stored
   */
  constructor(componentID: string, pinAlphaNum: string, tos: string, toPins: string, func: string, wireColour: string) {
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
      UI.alert("No components found in sheet");
      return undefined;
    }
    let chain = new Chain();
    
    if (!this.tos.includes(".")) {
      // Traditional notation, althoguh the cells would be different anyway so I don't know how we would even handle that
      const thisTos = seperateArguments(this.tos);

      const thisTosAtLast = thisTos.at(-1);
      if (thisTosAtLast == undefined) {
        UI.alert("Error: thisTosAtOne is undefined");
        return undefined;
      }

      const thisToPinsAtLast = seperateArguments(this.toPins).at(-1);
      if (thisToPinsAtLast == undefined) {
        UI.alert("Error: thisToPinsAtLast is undefined");
        return undefined;
      }
      
      const lastPin = globalComponents.get(thisTosAtLast)?.getDefinedPin(thisToPinsAtLast);
      if (lastPin == undefined) {
        UI.alert("Error: lastPin is undefined");
        return undefined;
      }
      if (seperateArguments(lastPin.tos).length == thisTos.length) {
        // If they are a duple chain
        if (thisTos.length == 1) {
          chain.pins.push(this, lastPin);
          return chain;
        }

        const thisTosAtZero = thisTos.at(0);
        if (thisTosAtZero == undefined) {
          UI.alert("Error: thisTosAtZero is undefined");
          return undefined;
        }

        const thisToPinsAtZero = seperateArguments(this.toPins).at(0)
        if (thisToPinsAtZero == undefined) {
          UI.alert("Error: thisToPinsAtZero is undefined");
          return undefined;
        }

        const nextPin = globalComponents.get(thisTosAtZero)?.getDefinedPin(thisToPinsAtZero);
        if (nextPin == undefined) {
          UI.alert("Error: nextPin is undefined");
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
    return "Pin(compID: " + this.componentID + ", pinName: " + this.pinAlphaNum + ", tos: " + this.tos +
    ", toPins: " + this.toPins + ", func: " + this.func + ", wireColour: " + this.wireColour + ")";
  }
}