https://developers.google.com/apps-script/advanced/fusion-tables
https://developers.google.com/adwords/scripts/docs/examples/google-fusion-tables

Hace falta habilitarlo: https://developers.google.com/apps-script/guides/services/advanced


# Crear tabla
https://developers.google.com/fusiontables/docs/v2/reference/table/insert
Para las columnas es obligatorio definir al menos name y type

function createFusionTable() {
  var table = FusionTables.newTable();
  table.name = 'My sales table';
  table.columns = [ {'name':'Product', 'type': 'STRING'} ];
  table.isExportable = true;
  var newTable = FusionTables.Table.insert(table);

  Logger.log('Table with ID = %s and name = %s was created.', newTable.tableId, newTable.name);
}

# Query
https://developers.google.com/fusiontables/docs/v2/sql-reference

## Select
FusionTables.Query.sql("SELECT * FROM 1Tvvt-ob6r_c8nczokS8zRDB0KNbUnjMjrFbsRrY7;");



## Insertar datos
https://developers.google.com/fusiontables/docs/v1/using#insertRow

FusionTables.Query.sql("INSERT INTO 1Tvvto6rc8nzoS8RBKNUjjFbsRrY7 (ID,Name,dirID) VALUES('a8osdasd', 'Pepito', '00345');");


## Update
UPDATE 1Na6KJmnOLz04Q2Ge2VhI5G9 SET Notificado=1 WHERE ROWID = '2';
