<https://www.visidata.org/>

Interfaz ncurses para analizar distintos tipos de ficheros.
vd fichero.csv

También hace conversiones, por ejemplo, de pcap a json

```bash
vd input.pcap -b -o output.json
```

Exportar el contenido de la sheet1 del xlsx:

```bash
vd -b foo.xlsx -o foo.csv +:Sheet1::
```

Podemos abrir fiheros xls/xlsx, csv, json, sqlite, pcap, etc.

Para los fiheros excel, vemos el resultado de la columna, no la fórmula.

Podemos añadir una nueva columna usando "=" (estilo columnas dinámicas de las hojas de cálculo).
