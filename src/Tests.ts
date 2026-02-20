/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function testFindIDCell() {
  // UI.alert("Test result: " + findIdCells(["VIT", "IMP", "PER"]).map(function(val) { return "ROW " + val.getRow() + " : COL " + val.getColumn(); }));
  // UI.alert("Test result: " + Component.fromID("PER").row);
  UI.alert("Test result: " + (Component.getAllComponentsMap()?.get("CRA")?.getDefinedPin("6")?.toString() ?? "null"));
}

function testGetChain() {
  // UI.alert("Test result: " + Component.fromID("VIT").getPin(2).getChain().toString());
  UI.alert("Test result: " + (Component.fromID("PER")?.getDefinedPin("A")?.getChain()?.toString() ?? "null"));
  // const chain = new Chain();
  // chain.pins = [new Pin("VIT", 2, "IMP", "4", "Crac", "nunuunununun"), new Pin("IMP", 4, "IMP", "4", "Crac", "nunuunununun")]
  // UI.alert("Test result: " + Component.fromID("VIT").getPin(2).getChain().toString());
}

function testSeperateArguments() {
  UI.alert("Test result: " + seperateArguments("VIT"));
}