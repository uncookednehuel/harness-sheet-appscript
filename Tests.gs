function testFindIDCell() {
  // UI.alert("Test result: " + findIdCells(["VIT", "IMP", "PER"]).map(function(val) { return "ROW " + val.getRow() + " : COL " + val.getColumn(); }));
  // UI.alert("Test result: " + Component.fromID("PER").row);
  UI.alert("Test result: " + Component.getAllComponentsMap().get("CRA").getPin(6).toString());
}

function testGetChain() {
  // UI.alert("Test result: " + Component.fromID("VIT").getPin(2).getChain().toString());
  UI.alert("Test result: " + Component.fromID("PER").getPin("A").getChain().toString());
  // const chain = new Chain();
  // chain.pins = [new Pin("VIT", 2, "IMP", "4", "Crac", "nunuunununun"), new Pin("IMP", 4, "IMP", "4", "Crac", "nunuunununun")]
  // UI.alert("Test result: " + Component.fromID("VIT").getPin(2).getChain().toString());
}

function testSeperateArguments() {
  UI.alert("Test result: " + seperateArguments("VIT"));
}