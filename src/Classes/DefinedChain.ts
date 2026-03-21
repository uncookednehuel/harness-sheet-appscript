class DefinedChain {
    pins: Array<DefinedPin>;

    constructor(...pins: DefinedPin[]) {
        this.pins = pins;
    }

    /**
     * Burns the chain to the speadsheet
     */
    burnChain(): void {
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
        let str = 'IDs: {';
        this.pins.forEach((val, i, arr) => {
            str += val.componentID + (i === arr.length - 1 ? '' : ' :: ');
        });
        str += '} Pins values: {';
        this.pins.forEach((val, i, arr) => {
            str += val.pinAlphaNum + (i === arr.length - 1 ? '' : ' :: ');
        });
        str += '}';
        return str;
    }
}
