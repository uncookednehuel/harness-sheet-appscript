class Chain {
    pins: Pin[];

    constructor(...pins: Pin[]) {
        this.pins = pins;
    }

    /**
     * Creates a Chain object with pins created from two arrays of equal length
     * @param tos array of tos
     * @param toPins array of alphanumerical pin values
     * @returns a Chain object with the pins created from the two arrays, or undefined if the arrays are of different lengths
     */
    static fromZip(tos: string[], toPins: string[]): Chain | undefined {
        if (tos.length !== toPins.length) {
            return undefined;
        }

        const newPins: Pin[] = [];
        for (let i = 0; i < tos.length; i++) {
            newPins.push(new Pin(tos[i], toPins[i]));
        }
        return new Chain(...newPins);
    }

    /**
     * Defines the chain by creating a DefinedChain object with each bin being defined.
     * The idea behind "defined" pins/chains is that they are grounded in the actual sheet with ranges
     * and values that would populate the cells, while the non-defined versions are for easier creation and manipulation
     * @returns A defined chain
     */
    defineByRead(compMap: Map<string, Component> = Component.getAllComponentsMap()): DefinedChain | undefined {
        const newChain = new DefinedChain();
        for (let i = 0; i < this.pins.length; i++) {
            const ipin = this.pins[i];
            const pin: DefinedPin | undefined = ipin.defineByRead(compMap.get(ipin.componentID));
            if (pin) {
                newChain.pins.push(pin);
            } else {
                Logger.log(
                    `Pin with componentID ${ipin.componentID} and pinAlphaNum ${ipin.pinAlphaNum} returned undefined`
                );
                return undefined;
            }
        }
        return newChain;
    }

    generateDefinedChain(compMap: Map<string, Component> = Component.getAllComponentsMap()): DefinedChain | undefined {
        const newChain = new DefinedChain();
        for (let i = 0; i < this.pins.length; i++) {
            const ipin = this.pins[i];
            const range
            const pin: DefinedPin | undefined = DefinedPin(ipin.componentID, ipin.pinAlphaNum, ipin.func, ipin.wireColour, range);
            if (pin) {
                newChain.pins.push(pin);
            } else {
                Logger.log(
                    `Pin with componentID ${ipin.componentID} and pinAlphaNum ${ipin.pinAlphaNum} returned undefined`
                );
                return undefined;
            }
        }
        return newChain;
    }
}
