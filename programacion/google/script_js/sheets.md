https://developers.google.com/apps-script/reference/spreadsheet/

# Leer cotenido
var sheet = SpreadsheetApp.openById("1RuOCHS0hQrT_b6fv1-udu4pE");
Logger.log(sheet.getRange("B2:C4").getValues());

# Definir valores
https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

// The size of the two-dimensional array must match the size of the range.
var values = [
  [ "2.000", "1,000,000", "$2.99" ]
];

var range = sheet.getRange("B2:D2"); // Debemos pasar el rango exacto
range.setValues(values);
