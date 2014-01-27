Desde el Jasper Server professional se pueden crear reportes desde la web.

# Crear datasource
Mirar datasource.md

# Crear dominio
Los dominios son como vistas de tablas SQL.

Create -> Domain
Seleccionamos el datadomain (si es mongo no aparecerá. mirar mongo.md)
Abrir el Create with domain designer (ETL integrado)

En este le diremos que talblas queremos usar.

Derived Tables: hacer vistas sql de tablas.
Joins: nos muestra los 'contraint' que pueda haber entre las tablas. Nos permite hacer joins entre las tablas. Importante porque a la hora de generar un report solo se puede hacer una. Con los joins podemos usar más de una.
Calculated fields: conversiones de los datos, en lenguaje SQL. Crear campos nuevos a partir de cálculos
Pre-filters: meter filtros tipo WHERE
Display: que tablas queremos mostrar

Con esto terminamos con el Domain Designer.
Damos a Submit, y con esto guardamos el dominio.
Una vez que lo hemos guardado, ya podemos salir dando a Cancel, o usar el menu de arriba para ir a algún lado.

Comprobar que se he creado el dominio donde hemos dicho.


# Ad-Hoc
Nos pide como origen un domain, un Topic (jrxml) u OLAP.
Seleccionaremos el domain que hemos creado antes.

En el siguiente paso tendré que decir la tabla que queremos usar (si tenemos un join podremos meter las tablas que estén unidas)
Prefilters.
Display: podemos darle nuevos nombre a los campos.
Save as Topic: definimos el nombre y lo metemos en nuestra carpeta.
No hay ningún botón de guardar. Ya directamente seleccionamos lo que queremos crear (Table, Chart, etc)

Ahora nos mete al Ad Hoc Editor, que nos permite hacer análisis en tiempo real. Y si nos gusta guardarlo como Report.

Las variables pueden estar en Fields o en Measures.
Si las metemos en Measures nos da más opciones (max, media, average, sum, etc)

Elegimos para este ejemplo: Table -> Sample data (no nos saca todos los valores, para que vaya más rápido)
Ahora arrastrando las variables a "Column" vamos poniendo los datos que necesitamos.
Podemos crear filtros, moviendo la variable a la columna filters (a la derecha del todo), o pinchando con el botón derecho sobre la variable que hemos puesto en 'Columns'

Jugando con mover las variables a "Groups", y con los 'engranajes' (que nos dejan seleccionar entre 'Detail data', 'Total Data', 'Details and Data'), podemos contar las incidencias por severidad y proyecto, por ejemplo.
Las variables se pueden usar como filtro, o mostrarla y además como filtro.

Si usamos charts, con los data level, moviendo las barras de "Columns" y "Rows", pemos elegir entre "Total" o por variable.
También podemos cambiar el tipo de gráfico (en los engranajes)

Una vez generado podemos decidir guardarlo como reporte. También podemos exportar.


# Dashboard
Podemos generar un dashboard a partir de informes ya creados.
Si usamos un report generado con iReport veremos todo el report metido dentro de una caja como overview, sin poder editarlo.

En el dashboard podemos poner botons, cajas, etc.
Los elementos aparecen depende de lo que tengas en el dashboard.

Podemos meter filtros en el dashboard. Para ello es necesario que en el report hubiésemos generado los filtros.

Para modificar el título: Options -> Edit title text

Cuidado con tocar reports metidos en un dashboard. Seguramente tengamos que volver a editar el dashboard.

Los dashboard no se pueden enviar, ni programar... es solo para visualizarlo en un momento concreto.
Si tenemos filtros y los cambiamos, no se guarda el estado la próxima vez que entremos.

En un dashboard se pueden meter otros dashboard. No se pueden meter imágenes.


Custom url. Podemos poner un iframe con una url determinada (que la cargará el navegador local, no jasper), y podemos pasarle parámetros que sean filtros de algun reporte que hayamos metido. Para poder usar los filtros en la url, tenemos que arrastrar dicho filtro al dashboard.

Se puede copiar el url de un dashboard guardado y pasarselo a cualquier persona.

Para que se vea mejor los gráficos, podemos esconder las "Scroll bars".


# View > messages. Si hay algún error se mostrará ahí.
