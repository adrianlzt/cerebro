Creamos nuevo reporte
A4 apaisado, sin wizard
Borramos las bandas que no vayamos a usar.
Nos quedamos con title, summary y background.
Static text al Title si solo queremos poner un texto.
Text field si queremos poder meter alguna variable en el texto.

Usamos phpmyadmin para generar la query con los datos que queremos.

Aqui tenemos dos opciones.
O hacemos una query currada donde agrupamos por día, y ya calculamos el avg time.
O pasamos todos los datos y los cálculos los hacemos luego en Jasper.

Yo tiro por el segundo camino. Este tiene el inconveniente de que tardará más en obtener los datos, al tener que coger toda la tabla.

En la siguiente página del wizard (porque estoy creando un subdataset con el wizard) agrupo por submissiondate
Y agrupo tambien por severidad (Group 2)

Si quiero definir la query general, le doy al botón de base de datos que está al lado de preview.
Y si quiero agrupar lo hago pinchando con el botón derecho sobre el report y "Add Report Group"
Al crear los grupos me añade unas bandas nuevas, ¿para qué?

Meto el gráfico de burbujes en la banda summary.
El eje z es el radio de la burbuja.

