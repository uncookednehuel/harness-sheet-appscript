function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const submenu = ui.createMenu('are').addItem('gay', 'gay');
    const importantSubmenu = ui.createMenu('You').addSubMenu(submenu);
    ui.createMenu('Harness')
        .addItem('Modify selected chain', 'openDialogue')
        .addItem(
            'Add component starting at selected cell',
            'promptCreateHarness'
        )
        .addItem('Add chain', 'createChain')
        .addItem('TestChain', 'testChain')
        .addItem('TestGetChain', 'testGetChain')
        // .addItem('Test', 'testSeperateArguments')
        .addSubMenu(importantSubmenu)
        .addToUi();
}

function openDialogue() {
    const template = HtmlService.createTemplateFromFile('ModifyChain');

    template.initialData = {
        connectorList: GetConnectorList(),
        pinList: GetPinList(),
    };

    const html = template.evaluate().setWidth(700).setHeight(500);

    SpreadsheetApp.getUi().showModalDialog(html, 'Modifying selected chain');
}

// function onEdit(e) {
//   // UI.alert(seperateArguments("44 :: 3 :: 6677 :: 22"));
//   // return;
//   // Only accept single sell edits
//   if (e.value === null && e.oldValue === null) { return; }

//   // disabled for now because we actually don't want it to ripple descriptions
//   if (SHEET.getRange(1, e.range.getColumn()).getValue() === FUNCTION_TEXT && false) {
//     rippleDescription(e)
//   }

//   if (SHEET.getRange(1, e.range.getColumn()).getValue() === PIN_TEXT) {
//     ripplePin(e);
//   }
// }

function gay() {
    UI.alert('Hahahah you fell for it silly');
}
