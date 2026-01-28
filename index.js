const sheetName = "users";

function doGet(e) {
  const user = e.parameter.user;
  if (!user) {
    return ContentService.createTextOutput("Brak usera");
  }

  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  let row = data.findIndex(r => r[0] === user);

  let suma = 0;

  if (row === -1) {
    suma = Math.floor(Math.random() * 10001);
    sheet.appendRow([user, suma]);
  } else {
    const los = Math.floor(Math.random() * 10001);
    suma = data[row][1] + los;
    sheet.getRange(row + 1, 2).setValue(suma);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ user, suma }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["user", "suma"]);
  }
  return sheet;
}
