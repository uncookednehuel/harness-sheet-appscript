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
    let selectedPinTos = seperateArguments(this.tos);
    let nextPin = globalComponents.get(seperateArguments(this.tos)[0]).getPin(seperateArguments(selectedPin.toPins.toString())[0]);
    let nextPinTos = seperateArguments(nextPin.tos); // TODO probably should delete this

    // TODO have to make condition for if starting on last pin, because the current logic will not work.

    // Couple chain
    if (selectedPinTos.length == 1 && nextPinTos.length == 1) {
      // If there are only two pins in this chain, they will be only pointing to each other. This is that case
      chain.pins.push(selectedPin);
      chain.pins.push(nextPin);
      return chain;
    }

    // Complex chain
    let hasWrappedEnd = false;
    let chainLength = Infinity;
    let iterations = 0;
    while (iterations <= chainLength) {
      //if () { break; }
      // Normal case, where each pin has one less To than the previous
      if (nextPinTos.length < selectedPinTos.length) {
        if (hasWrappedEnd) {
          chain.pins.unshift(selectedPin);
          UI.alert("Unshifted selected: " + selectedPin.toString());
        } else {
          chain.pins.push(selectedPin);
          UI.alert("Pushed selected: " + selectedPin.toString());
        }
        iterations++;
        selectedPin = nextPin;
        UI.alert("Getting next pin " + nextPinTos[0] + " in iteration " + iterations);
        nextPin = globalComponents.get(nextPinTos[0]).getPin(seperateArguments(nextPin.toPins.toString())[0]);
      } else { // Must be at end, because first element of end will point to second to last one
        chain.pins.push(selectedPin);
        UI.alert("Pushed selected before last: " + selectedPin.toString());
        chain.pins.push(nextPin);
        UI.alert("Pushed next: " + nextPin.toString());
        iterations += 2;
        hasWrappedEnd = true;
        chainLength = nextPinTos.length;

        // TODO I am almost certain the problem with getPin lyes in one of these not getting pins properly

        selectedPin = globalComponents.get(nextPinTos[nextPinTos.length - 1])
        .getPin(seperateArguments(nextPin.toPins)[nextPinTos.length - 1]);
        nextPin = globalComponents.get(selectedPinTos[0]).getPin(seperateArguments(selectedPin.toPins.toString())[0]);
      }
      selectedPinTos = seperateArguments(selectedPin.tos);
      nextPinTos = seperateArguments(nextPin.tos);
    }

    return chain;
    // boom blyat cyka done!
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