/**
 * Represents a pin using only its componentID and the pinAlphaNum
 */
class Pin {
  constructor (componentID, pinAlphaNum) {
    this.componentID = componentID;
    this.pinAlphaNum = pinAlphaNum;
  }
  
  define(component) {
    const vals = SHEET.getRange(component.row + pinToPinValue(this.pinAlphaNum), component.col - 3, 1, 5).getValues()[0];
    return new DefinedPin(this.id, pin, vals[1], vals[2], vals[3], vals[4]);
  }
}