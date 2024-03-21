# Borrados lentos
Hacer un explain para ver que está haciendo.
Tiene claves foreign con cascade on delete? Esto hace que tenga que buscarse esa key de unión entre las tablas.
Si esa key no es índice en la segunda tabla esto puede ralentizar mucho el borrado.


# Problemas con query plan
Mirar sección "# Coste" en cost.md



# Posibles razones para queries lentas
ANALYZE no ha sido ejecutado.

Query tiene un error de concepto/desarrollo.

Falta algún índice importante.

Un índice ha creido mucho, y/o tiene mucho bloat, y ha cambiado el plan de ejecución a uno peor.

Statistics target es muy pequeño

Estimates are off (correlation). Mirar explain.md "Correlated columns"

Hay más causas
