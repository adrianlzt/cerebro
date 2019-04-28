mysql -BNe "show global status like 'com_admin%';"
	-B: batch
	-e: ejecuta tal query
	-N: sin nombres de columna

mysql  -BN base_de_datos -e "select * from tabla;"

select * from user\G
Salida con un campo por fila


mysql -h host -U user -p -h 1.2.3.4
