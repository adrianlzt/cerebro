http://community.jaspersoft.com/project/jasperreports-server

Tomcat corriendo la aplicación Jasper Server, que es Java.

Desde el servidor podemos diseñar reportes, pero de forma más básica que iReports.
Viene bien para análisis en tiempo real. Mucho más sencillo. Pero solo nos deja crear una gráfica.
Podemos unir varias gráficas en un Dashboard, pero generar un pdf tiene que ser de un report.
Para generar reportes serio mejor iReport

A partir de los datos podemos generarnos una vista (jasper le llama domain) para generar el reporte.
Nos puede venir bien para quitar tablas no necesarias, o unir tablas que no estáń relacionadas.

A partir de esta vista virtual, usamos el AdHocView para editar y generar un report.
Podemos guardar este AdHocView y seguir trabajando sobre él, o decidir generar un reporte.


Toda la gestión de scheduling se hace desde el server.


/// WEB UI ////

Al logear seleccionar idioma ingles y poner la zona horaria correcta.

# Datasources
Se pueden crear desde la propia web. Es más coñazo porque no tiene desplegables, y tenemos que tener abierto el iReport para conocer el driver.
