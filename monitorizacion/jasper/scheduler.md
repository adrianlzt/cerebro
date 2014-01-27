Es bastante evidente como se generan los reports.

El report siempre se guarda en Jasper, y luego se puede enviar.

Si queremos que nos envíe el report generado en pdf (o lo que sea), tenemos que decirle que nos "attach file".

En el scheduler podmos ver las tareas programadas, vieno cuando fue la última ejecución, próxima, estado, etc.

El timestamp que se pone al report es al final del fichero. No se puede cambiar.

Los repos se guardan en la base de datos.

Informes generados se llaman -> "Content resource"

Si en los filtros para generar el reporte usamos fechas, tener cuidado, porque si ponemos un filtro de fecha, se mantendrá, y la siguiente vez que se ejecute volverá a coger las mismas fechas. Se pueden poner fechas tipo: WEEK+1 para evitar estos problemas.

Rotado de ficheros:
Han creado un script que bajo un path, mira a ver cuando "Content resources" hay, y solo deja los de los últimos diez dias.

