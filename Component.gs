/**
 * Represents one of the "blocks" that has an ID, name, and multiple rows of pins, each with properties.
 */
class Component {
  /**
   * Creates a new component object using a known location on the sheet and ID
   */
  constructor (row, col, id, maxPins) {
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
  static fromID(id) {
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
  }

  /**
   * Returns a list of all found components in the current sheet (to one day be updated to look across
   * multiple sheets) and returns a map
   * @return {Map} Keys are the ID and values are the Component class instance
   */
  static getAllComponentsMap() {
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
   * @param {pinValue} The pin value, also can be pin letter (you do not have to pinToPinValue!)
   * @return A pin object
   */
  getPin(pin) {
    const pinValue = pinToPinValue(pin);
    const vals = SHEET.getRange(this.row + pinValue, this.col - 3, 1, 5).getValues()[0];
    return new Pin(this.id, pin, vals[1], vals[2], vals[3], vals[4]);
  }
}