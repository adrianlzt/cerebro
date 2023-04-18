Si usamos una cadena de conexión tipo:
host\\NOMBRE
Esto intentará conectar al puerto 1434/udp del host y de ahí obtendrá la información de donde está el puerto de la bd "NOMBRE" (que suele ser dinámico).

Para que esto funcione el servicio SQL Server Browser debe estar activo (enable y start).
