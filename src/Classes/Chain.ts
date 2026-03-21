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
    define(): DefinedChain | undefined {
        const global: Map<string, Component> = Component.getAllComponentsMap();

        const newChain = new DefinedChain();
        for (let i = 0; i < this.pins.length; i++) {
            const { componentID, pinAlphaNum } = this.pins[i];
            if (!componentID || !pinAlphaNum)
                Logger.log(
                    `There is an undefined value at index ${i}, componentID: ${componentID}, pinAlphaNum: ${pinAlphaNum}`
                );
            const pin: DefinedPin | undefined = global
                .get(componentID)
                ?.getDefinedPin(pinAlphaNum);
            if (pin) {
                newChain.pins.push(pin);
            } else {
                Logger.log(
                    `Pin with componentID ${componentID} and pinAlphaNum ${pinAlphaNum} is was not found in global components map`
                );
                return undefined;
            }
        }
        return newChain;
    }
}
