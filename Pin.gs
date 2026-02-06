/**
 * Represents a pin entry in a component, e.g. pin value, the Tos in the chain, To Pins, Function, and so on
 */
class Pin {
  /**
   * Creates a pin
   */
  constructor(componentID, pinName, tos, toPins, func, wireColour) {
    this.componentID = componentID;
    this.pinName = pinName;
    this.tos = tos;
    this.toPins = toPins;
    this.func = func;
    this.wireColour = wireColour;
  }

  // Bloody monster
  getChain() {
    const globalComponents = Component.getAllComponentsMap();
    let chain = new Chain();

    let selectedPin = this;
    UI.alert(this.tos);
    let selectedPinTos = seperateArguments(this.tos);
    UI.alert(selectedPin.toPins);
    let nextPin = globalComponents.get(seperateArguments(this.tos)[0]).getPin(seperateArguments(selectedPin.toPins.toString())[0]);
    UI.alert(nextPin.tos);
    let nextPinTos = seperateArguments(nextPin.tos); // TODO probably should delete this

    // Couple chain
    if (selectedPinTos.length == 1 && nextPinTos.length == 1) {
      // If there are only two pins in this chain, they will be only pointing to each other. This is that case
      chain.pins.push(selectedPin);
      chain.pins.push(nextPin);
      return chain;
    }

    // Complex chain
    let hasWrappedEnd = false;
    while (true) {
      // Normal case, where each pin has one less To than the previous
      if (nextPinTos.length < selectedPinTos.length) {
        if (hasWrappedEnd) {
          chain.pins.unshift(selectedPin);
        } else {
          chain.pins.push(selectedPin);
        }
        selectedPin = nextPin;
        selectedPinTos = seperateArguments(selectedPin.tos);
        nextPin = globalComponents.get(nextPinTos[0]).getPin(seperateArguments(nextPin.toPins.toString())[0]);
        nextPinTos = seperateArguments(nextPin.tos);
        continue;
      } else { // Must be at end, because first element of end will point to second to last one
        chain.pins.push(selectedPin);
        hasWrappedEnd = true;
        selectedPin = globalComponents.get(selectedPinTos[selectedPinTos.length - 1])
        .getPin(seperateArguments(selectedPin.toPins)[selectedPinTos.length - 1]);
        selectedPinTos = seperateArguments(selectedPin.tos);
        nextPin = globalComponents.get(selectedPinTos[0]).getPin(seperateArguments(selectedPin.toPins.toString())[0]);
        nextPinTos = seperateArguments(nextPin.tos);
      }

      if (chain.pins.includes(nextPin)) { break; }
    }

    return chain;
    
    // Else, follow forward until the last one, get index of the one that you were in, and go from length - that index to end to do the rest of the beginning pins up to
    // the current one, inserting them earlier in the compiled list, and boom bylat cyka done!
  }

  /**
   * Returns string representation
   * @return {String}
   */
  toString() {
    return "Pin(compID: " + this.componentID + ", pinName: " + this.pinName + ", tos: " + this.tos +
    ", toPins: " + this.toPins + ", func: " + this.func + ", wireColour: " + this.wireColour + ")";
  }
}