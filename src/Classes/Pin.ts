/**
 * Represents a pin using only its componentID and the pinAlphaNum
 */
class Pin {
    componentID: string;
    pinAlphaNum: string;
    func: string | null;
    wireColour: string | null;

    constructor(
        componentID: string,
        pinAlphaNum: string,
        func: string | null = null,
        wireColour: string | null = null
    ) {
        this.componentID = componentID;
        this.pinAlphaNum = pinAlphaNum;
        this.func = func;
        this.wireColour = wireColour;
    }

    /**
     * Defines the pin by getting the rest of the info from the spreadsheet and returning a DefinedPin object
     * @return {DefinedPin}
     */
    defineByRead(component: Component | null = Component.fromID(this.componentID)): DefinedPin | undefined {
        if (!component) {
            Logger.log(`Component with ID ${this.componentID} not found in sheet`);
            return undefined;
        }
        const range = SHEET.getRange(
            component.row + pinToPinValue(this.pinAlphaNum),
            component.col - 3,
            1,
            5
        );
        const vals = range.getValues()[0];
        return new DefinedPin(
            this.componentID,
            this.pinAlphaNum,
            vals[1],
            vals[2],
            vals[3],
            vals[4],
            range
        );
    }
}
