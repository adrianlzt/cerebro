Permisos necesarios
GRANT SELECT,LOCK TABLES ON nombredb.* TO 'user'@'ip';

mysqldump -u root -p database > database.sql
mysql -u root -p otrabd < database.sql

Si me da error del tipo: when using LOCK TABLES
mysqldump -u root -p mysqldump --lock-tables=false database > database.sql

mysqldump --password=xxx ...


Hacer un dump con un where:
mysqldump -w "ColumnaTiempo >= CURDATE() - INTERVAL 1 DAY" bd tabla > salida.sql
