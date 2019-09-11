Tablas donde se almacenan valores grandes de una columna de un row.

Hasta 1GB

Todas las tablas tienen una toast si tenemos columnas de tamaño variable.

Parámetros que se ponen por cada columna:
  PLAIN, solo para data con un tamaño predefinido
  EXTERNAL, no intentar comprimirlo (por ejemplo si estamos poniendo un jpg, ya comprimido)
  EXTENDED, intentar comprimirlo
  MAIN, intentar evitar todo lo posible "toasting" el valor (intentar usar un bloque entero para este valor solo)


