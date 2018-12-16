mysql -BNe "show global status like 'com_admin%';"
	-B: batch
	-e: ejecuta tal query
	-N: sin nombres de columna

mysql  -BN base_de_datos -e "select * from tabla;"

select * from user\G
Salida con un campo por fila

