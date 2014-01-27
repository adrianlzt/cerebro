http://community.jaspersoft.com/project/jaspersoft-etl

Mejor correrlo con el java de Oracle. Con el openjdk se ve un poco mal (y algunos popups se ven en negro)

INTREGACION DE DATOS:
ETL: Extract Transform Load

Obtiene datos de muchos inputs.
Los transforma
Los convierte en datos MySQL que luego los lee jasper server.

MongoDB problemas. La información entre colecciones no está relacionada.


Desde ETL express tenemos que poder conectarnos a las fuentes de datos y donde lo vayamos a guardar.
Usaremos túneles SSH para ganar estas conectividades.
Una vez diseñado el flow, lo exportaremos en un zip, que meteremos en un cron en jasperserver.
Asegurarnos que jasperserver tiene las conectividades necesarias para obtener los datos y guardarlos en la mysql.

Los ETL se diseñan gráficamente, pero realmente es código java por detrás.
Tenemos la pestaña "Code" donde podemos ver el código.

Podemos crear dependencias entre tareas.


## Crear job ##
Dar al boton Crear -> Job
De la paleta de la derecha cojo el componente que toque y los arrastro.
Para los CSV -> usar tFileInputDelimited
Doble click para editarlo.
Para seleccionar el fichero le damos al diskete que hay al lado del 'Property type'. Este un wizard para procesar ficheros.
Tengo que definirle las salidas de este componente. Abajo de las propiedades, Edit Schema.
Ahí le decimos como es el esquema del csv. En este caso, cada campo que creemos se va correspondiendo con cada columna del csv
A lo mejor tenemos que juguetar un poco con los caracteres de escape y 'text enclosure', y dando a refresh hasta que veamos bien el preview.
Tambien podemos hacer que la primera linea defina los nombres de las columnas.
En el paso siguiente nos autogenerará los campos. Debermos revisarlos para ver si cuadran. Posiblemente subir el tamaño de algún campo de string.
Este elemento nos lo ha guardado en el repositorio (ventana de la izquierda con icono de casita), bajo Metadata -> File Delimited
Si quisieramos reutilizarlo, podríamos arrastrarlo.
También podría crear un file delimited nuevo, y en 'property type' seleccionar 'Repository', y coger el que creamos antes.
Si no me gusta el esquema, una vez creado, puedo editarlo en el componente, abajo del todo, 'Edit Schema', cambiando el esquema a 'Built in'.
Esto solo modificará nuestro componente.
Si tenemos el esquema 'Repository', nos deja elegir si cambiar el del repo, o cambiar el local.

Agregamos un tMap que hará la conversión de campos entre el cvs y la mysql.
Para unir el csv al tmap, botón derecho sobre el csv, Fila -> Main, y arrastramos la flecha al tmap.
Edito el tmap para ponerle unas salidas.
Siempre mirar en el editor en la parte inferior para ver que todo está correcto.
En este editor vemos la entrada y la salida de este paso. (el esquema de entrada lo ha progresado desde el elemento anterior)
Ahora creamos las salidas, y también los elementos intermedios si necesitamos hacer alguna modificación.
Cuidado en la salida, porque cada tabla tiene que ir a un conector mysql distinto (en este ejemplo que queremos salir a una mysql).
Podemos meter varios campos en una sola tabla, pero si lo hacemos automáticamente me crea diferentes tablas.

Por último creo el elemento mysql.
Acordarme de definir la entrada. Podemos editar el schema, y propagar todos de los inputs a los outputs.

Antes de exportar recordar donde se va a ejecutar el script, porque los inputs y los outputs pueden cambiar (ips distintas, etc)
También tener en cuenta también los usuarios de mysql, que luego conectarán desde localhost.
