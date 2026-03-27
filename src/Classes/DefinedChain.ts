class DefinedChain {
    pins: Array<DefinedPin>;

    constructor(...pins: DefinedPin[]) {
        this.pins = pins;
    }

    /**
     * Burns the chain to the speadsheet
     */
    burn(): void {
        Sheets?.Spreadsheets.Values.batchUpdate(
            {
                valueInputOption: 'USER_ENTERED',
                data: this.pins.map(pin => {
                    return {
                        range: pin.range.getA1Notation(),
                        values: [[pin.tos, pin.toPins, pin.func]],
                    };
                }),
            },
            SHEET.getParent().getId()
        );
    }

    /**
     * Returns string representation of the chain
     * @returns {string}
     */
    toString(): string {
        return `DefinedChain pins: {${this.pins.map(pin => `(${pin.componentID}, ${pin.pinAlphaNum})`).join(', ')}}`;
    }
}
