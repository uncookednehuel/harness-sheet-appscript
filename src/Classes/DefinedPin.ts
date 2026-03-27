import Range = GoogleAppsScript.Spreadsheet.Range;

/**
 * Represents a pin entry in a component, e.g. pin value, the Tos in the chain, To Pins, Function, and so on
 */
class DefinedPin extends Pin {
    tos: string;
    toPins: string;
    range: Range;
    /**
     * Creates a defined pin. TODO will need to make two constructors for the different typs of pin formats (traditional vs new) and also change what info is stored
     */
    constructor(
        componentID: string,
        pinAlphaNum: string,
        tos: string,
        toPins: string,
        func: string | null = null,
        wireColour: string | null = null,
        range: Range
    ) {
        super(componentID, pinAlphaNum, func, wireColour);
        this.tos = tos;
        this.toPins = toPins;
        this.range = range;
    }

    /**
     * I don't know what to do with these classes. Easiest I can think of is this for now.
     */
    defineByRead(): never {
        throw new Error('DefinedPin cannot be defined again');
    }

    //* TODO must replace this when modifying class to proper
    isTraditional(): boolean {
        return !this.tos.includes('.');
    }

    // Bloody monster
    getChain(): DefinedChain | undefined {
        const globalComponents = Component.getAllComponentsMap();
        if (globalComponents.size === 0) {
            UI.alert('No components found in sheet');
            return undefined;
        }

        let orderedTos: string[];
        let orderedToPins: string[];
        if (this.isTraditional()) {
            // Traditional notation, although the cells would be different anyway so I don't know how we would even handle that
            const thisTos: string[] = seperateArguments(this.tos);
            const thisTosLast: string | undefined = thisTos[thisTos.length - 1];
            // TODO Review this undefined behaviour, why would a string be undefined?
            if (!thisTosLast) {
                UI.alert('Error: thisTosAtLast is undefined');
                return undefined;
            }

            const thisToPins: string[] = seperateArguments(this.toPins);
            const thisToPinsLast: string | undefined =
                thisToPins[thisToPins.length - 1];
            if (!thisToPinsLast) {
                UI.alert('Error: thisToPinsAtLast is undefined');
                return undefined;
            }

            const lastPin: DefinedPin | undefined = globalComponents
                .get(thisTosLast)
                ?.getDefinedPin(thisToPinsLast);
            const lastPinTos: string[] = seperateArguments(lastPin?.tos ?? '');
            if (!lastPin) {
                UI.alert('Error: lastPin is undefined');
                return undefined;
            }

            // Duple chain
            if (lastPinTos.length === 1 && thisTos.length === 1) {
                Logger.log(
                    `Duple chain of ${this.componentID}:${this.pinAlphaNum}  ${lastPin.componentID}:${lastPin.pinAlphaNum}`
                );
                return Chain.fromZip(
                    [this.componentID, lastPin.componentID],
                    [this.pinAlphaNum, lastPin.pinAlphaNum]
                )?.defineByRead();
            }

            orderedTos = lastPinTos.reverse().concat(lastPin.componentID);
            orderedToPins = seperateArguments(lastPin.toPins)
                .reverse()
                .concat(lastPin.pinAlphaNum);

            // Need to test other conditions, seems to work now

            if (lastPinTos.length === thisTos.length) {
                Logger.log(
                    `Lenghts are equal of lastPin: ${lastPinTos.length} and this: ${thisTos.length}`
                );
                const checkPin: DefinedPin | undefined = globalComponents
                    .get(thisTos[0])
                    ?.getDefinedPin(thisToPins[0]);
                if (checkPin === undefined) {
                    UI.alert('Error: checkPin is undefined');
                    return undefined;
                }
                Logger.log(
                    `Check pin of ${checkPin.componentID}:${checkPin.pinAlphaNum}`
                );
                const checkPinTos: string[] = seperateArguments(
                    checkPin?.tos ?? ''
                );
                if (checkPinTos.length === thisTos.length - 1) {
                    Logger.log('We are at the front of chain blyaaaat');
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

        // boom blyat cyka done!
        Logger.log(
            `Final before zip: Ordered Tos: ${orderedTos}, Ordered ToPins: ${orderedToPins}`
        );
        return Chain.fromZip(orderedTos, orderedToPins)?.defineByRead();
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
