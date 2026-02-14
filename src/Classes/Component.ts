/**
 * Represents one of the "blocks" that has an ID, name, and multiple rows of pins, each with properties.
 */
class Component {
  row: number;
  col: number
  id: string;
  maxPins: number;
  /**
   * Creates a new component object using a known location on the sheet and ID
   */
  constructor (row: number, col: number, id: string, maxPins: number) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.maxPins = maxPins;
  }

  /** 
   * Returns a new component object by searching for its ID (at some point this should
   * include across different sheets). This function should
   * one day be updated to get all column ranges at once to improve efficiency.
   * @param {String} The ID of the component you want to get
   * @return {Component} Component object
   */
  static fromID(id: string): Component | null {
    for (const [col, headerVal] of SHEET.getRange(1, 1, 1, SHEET_BREADTH).getValues()[0].entries()) {
      if (headerVal == FUNCTION_TEXT) {
        // Another for loop instead of indexOf because 2d array would make that more complicated
        for (const [row, val] of SHEET.getRange(2, col + 1, SHEET_DEPTH, 1).getValues().entries()) {
          if (val[0] == ID_PREFIX + id) {
            return new Component(row + 2, col + 1, id, SHEET.getRange(row + 2, col).getValue());
          }
        }
      }
    }
    return null;
  }

  /**
   * Returns a list of all found components in the current sheet (to one day be updated to look across
   * multiple sheets) and returns a map
   * @return {Map} Keys are the ID and values are the Component class instance
   */
  static getAllComponentsMap(): Map<string, Component> {
    let components = new Map();
    for (const [col, headerVal] of SHEET.getRange(1, 1, 1, SHEET_BREADTH).getValues()[0].entries()) {
      if (headerVal == FUNCTION_TEXT) {
        for (const [row, val] of SHEET.getRange(2, col + 1, SHEET_DEPTH, 1).getValues().entries()) {
          if (val[0].toString().charAt(0) == ID_PREFIX) {
            const id = val[0].toString().substring(1);
            components.set(id, new Component(row + 2, col + 1, id, SHEET.getRange(row + 2, col).getValue()));
          }
        }
      }
    }
    return components;
  }

  /**
   * Gets a pin object instance of a certain pin in the component
   * @param {string} The pin alphanumerical
   * @return {Pin} A pin object
   */
  getPin(pin: string) {
    return new Pin(this.id, pin);
  }

  /**
   * Gets a DefinedPin object instance of a certain pin in the component
   * @param {string} The pin alphanumerical
   * @return {DefinedPin} A defined pin object
   */
  getDefinedPin(pin: string) {
    return this.getPin(pin).define(this);
  }
}