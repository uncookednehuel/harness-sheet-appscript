/**
 * Represents a pin using only its componentID and the pinAlphaNum
 */
class Pin {
  componentID: string;
  pinAlphaNum: string;

  constructor (componentID: string, pinAlphaNum: string) {
    this.componentID = componentID;
    this.pinAlphaNum = pinAlphaNum;
  }
  
  /**
   * Defines the pin by getting the rest of the info from the spreadsheet and returning a DefinedPin object
   * @return {DefinedPin}
   */
  define(component: Component) {
    const vals = SHEET.getRange(component.row + pinToPinValue(this.pinAlphaNum), component.col - 3, 1, 5).getValues()[0];
    return new DefinedPin(this.componentID, this.pinAlphaNum, vals[1], vals[2], vals[3], vals[4]);
  }
}