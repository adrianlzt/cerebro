https://dba.stackexchange.com/a/40517
En postgres una database puede tener varios schemas (como dominios dentro de la bbdd).
Por defecto tendremos el "public" donde se almacenará todo y generalmente solo usaremos esto.
Si empieza a crecer probablemente queramos usar schemas para separar datos y privilegios.


# Crear y usar un schema
CREATE SCHEMA IF NOT EXISTS nombre;
CREATE TABLE IF NOT EXISTS nombre.tabla ...;
SELECT * FROM nombre.tabla;
