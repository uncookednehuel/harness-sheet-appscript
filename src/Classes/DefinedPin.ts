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

  //* TODO must replace this when modifying class to proper
  isTraditional(): boolean {
    return !this.tos.includes('.');
  }

  // Bloody monster
  getChain(): Chain | undefined {
    const globalComponents = Component.getAllComponentsMap();
    if (globalComponents.size === 0) {
      UI.alert('No components found in sheet');
      return undefined;
    }

    let orderedTos: string[];
    let orderedToPins: string[];
    if (this.isTraditional()) {
      // Traditional notation, althoguh the cells would be different anyway so I don't know how we would even handle that
      const thisTos: string[] = seperateArguments(this.tos);
      const thisTosLast: string | undefined = thisTos[thisTos.length - 1];
      // TODO Review this undefined behaviour, why would a string be undefined?
      if (thisTosLast === undefined) {
        UI.alert('Error: thisTosAtLast is undefined');
        return undefined;
      }

      const thisToPins: string[] = seperateArguments(this.toPins);
      const thisToPinsLast: string | undefined = thisToPins[thisToPins.length - 1];
      if (thisToPinsLast === undefined) {
        UI.alert('Error: thisToPinsAtLast is undefined');
        return undefined;
      }

      const lastPin: DefinedPin | undefined = globalComponents
        .get(thisTosLast)
        ?.getDefinedPin(thisToPinsLast);
      const lastPinTos: string[] = seperateArguments(lastPin?.tos ?? '');
      if (lastPin === undefined) {
        UI.alert('Error: lastPin is undefined');
        return undefined;
      }

      // Duple chain
      if (lastPinTos.length === 1 && thisTos.length === 1) {
        return Chain.zipChain(
          [this.componentID, lastPin.componentID],
          [this.pinAlphaNum, lastPin.pinAlphaNum]
        );
      }

      orderedTos = lastPinTos.reverse().concat(this.componentID);
      orderedToPins = seperateArguments(lastPin.toPins).reverse().concat(this.pinAlphaNum);
      if (lastPinTos.length === thisTos.length) {
        const checkPin: DefinedPin | undefined = globalComponents
        .get(thisTos[0])
        ?.getDefinedPin(thisToPins[0]);
        if (checkPin === undefined) {
          UI.alert('Error: checkPin is undefined');
          return undefined;
        }
        
        const checkPinTos: string[] = seperateArguments(checkPin?.tos ?? '');
        if (checkPinTos.length === thisTos.length - 1) {
          // We are at the front of the chain
          orderedTos = [this.componentID].concat(thisTos);
          orderedToPins = [this.pinAlphaNum].concat(thisToPins);
        }
      }
    } else {
      // New notation bollocks TODO
      orderedTos = [];
      orderedToPins = [];
    }

    return Chain.zipChain(orderedTos, orderedToPins);
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
