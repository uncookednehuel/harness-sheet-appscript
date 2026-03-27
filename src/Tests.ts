function testFindIDCell() {
    // UI.alert("Test result: " + findIdCells(["VIT", "IMP", "PER"]).map(function(val) { return "ROW " + val.getRow() + " : COL " + val.getColumn(); }));
    // UI.alert("Test result: " + Component.fromID("PER").row);
    UI.alert(
        'Test result: ' +
            (Component.getAllComponentsMap()
                ?.get('CRA')
                ?.getDefinedPin('6')
                ?.toString() ?? 'null')
    );
}

function testGetChain() {
    // UI.alert("Test result: " + Component.fromID("VIT").getPin(2).getChain().toString());
    UI.alert(
        'Test result: ' +
            (Component.fromID('PER')
                ?.getDefinedPin('A')
                ?.getChain()
                ?.toString() ?? 'returned null')
    );
    // const chain = new Chain();
    // chain.pins = [new Pin("VIT", 2, "IMP", "4", "Crac", "nunuunununun"), new Pin("IMP", 4, "IMP", "4", "Crac", "nunuunununun")]
    // UI.alert("Test result: " + Component.fromID("VIT").getPin(2).getChain().toString());
}

function testChain() {
    const pin1 = new Pin('VIT', '2');
    const pin2 = new Pin('IMP', '4');
    const chain = new Chain(pin1, pin2);
    const def = chain.defineByRead();
    def?.burn();
    UI.alert('Ran bloody test, bloddy definedchain: ' + def?.toString());
}

function testSeperateArguments() {
    UI.alert('Test result: ' + seperateArguments('VIT'));
}
