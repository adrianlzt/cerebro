# Posibles razones para queries lentas
ANALYZE no ha sido ejecutado.

Query tiene un error de concepto/desarrollo.

Falta algún índice importante.

Un índice ha creido mucho, y/o tiene mucho bloat, y ha cambiado el plan de ejecución a uno peor.

Statistics target es muy pequeño

Estimates are off (correlation). Mirar explain.md "Correlated columns"

Hay más causas
