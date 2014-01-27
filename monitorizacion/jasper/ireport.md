http://community.jaspersoft.com/project/ireport-designer

Usarlo con el jre de oracle: (http://www.java.com/es/download/help/linux_x64_install.xml)
JAVA_HOME=/usr/local/share/jre1.7.0_45/ ./ireport

Con ETL express hemos dejado nuestros datos en una MySQL (por ejemplo).

Necesitamos conectividad con la fuente de datos.

Gráficamente nos generamos el reporte.

Una vez creado el reporte, nos deja sincronizarnos con el jasperserver para subir ese report a una estructura de directorios interna de Jasper.
Podemos ejecutar nuestro reporte subido al server remotamente desde iReport.

## Uso ##

# Generar un reporte localmente 
File -> New -> Seleccionar template -> Wizard -> 
Tendremos que crear una nueva datasource si no tenemos ninguna.
En nuestro ejemplo el datasource será la base de datos mysql donde pusimos los datos que sacamos con el ETL.
JDBC -> MySQL
MongoDB -> solo deja coger una colección
CSV -> bien para el iReport, pero cogerlo desde el server no es fácil

Configuramos la mysql, host, puerto, user, base de datos.
Tenemos que configurar la query principal. Es obligatorio tener uno aunque después haremos subsets con más querys para obtener otros datos.
Ponemos por ejemplo: select * from algunaTabla
(No me funciona el Design Query)
Luego selecionamos los campos que queremos usar.
Luego tenemos "group by", que no usaremos (hacer mejor en la query)

Nos aparecerá la vista del diseñador del report.
Es una especie de maquetador basado en XML.
Dando sobre el reporte, botón derecho, propiedades podemos modificar campos importantes:
  temas de tamaño
  query
  Language (como haremos las regexp)
  columnas que queremos

Podemos usar subreports para automatizar la creación de varios gráficos. Creáme un gráfico por cada salida de la query.

Mas reports, boton derecho -> Add new dataset

Puede ir lento al crear los reports.

En cada report, hay un icono de BBDD para editar la query.

Cada report a la izquierda tiene las distintas "bandas" que tiene. Son para organizar para el documento.
Algunas tienen características especiales, como background.
Detail, te muestra todas las aparecias de ese campo. Vale para meter también gráficas

Podemos crear más bandas de detail si no caben bien las cosas.
Para agregar un elemento nuevo lo arrastramos desde la paleta al Diseñador.
Al meter los valores podremos jugar con las variables en el lenguaje que hayamos elegido.

# Conectar al server de jasper
Ventana -> Jasper Reports Server Repository
Creamos la nueva conexión.
Si queremos poner la organización en el login: jasperadmin|UDO
También podemos activar la opcion Jasper Professional: Herramientas -> Opciones -> iReport -> JasperReports Server Repositories
Nos cremos un arbol de directorios
Herramienta
  -datasources
  -inputs
  -reports
  -reports-exportados
 
Para meter el datasource le daremos con el botón derecho, datasource, y seleccionaremos el que creamos antes para el iReport.

Si queremos un nuevo datasource, le daremos al botón al lado del nombre del datasouorce 


# Crosstable
Tenemos que determinar los nombre que pondremos en las ordenadas, en las abcisas, y los valores que iran dentro de la tabla.
Ejemplo:
Rows: 
Hay dos row groups porque se podría agrupar horizontalmente por cosas.
Por ejemplo podría haber grupos grandes por cada servicio, y dentro de cada servicio, la severidad.

Ejemplo: crosstab con servicio en las rows y severidad en las columnas.
Elegimos la variables servicio y severidad en rows y columns.
En las Measures pongo TicketID
Si queremos ver la crosstab vamos al "Report Inspector", y veremos que está puesto en cada parte (Row Groups, Column Groups, Measures, ...)
Pinchando en cada elemento no muestra, por ejemplo en las measures, podemos elegir como calcula el valor: "Count", "Sum", "Avarage", etc

El GROUP BY lo hace automáticamente iReport.
Para ver la query que le estamos pasando, pinchamos sobre la crosstable, y a la izquierda del botón "Preview", hay un icono de una bbdd con una flechita.
Editando esa query podemos limitar por campos. Por ejemplo para solo mostrar las del último mes.


# Bandas
Eliminar las bandas que no usemos.
La banda de Detail por cada salida del select te la pone.
Si ponemos el nombre de la variable ${VAR}, pues veríamos una lista con todas las salidas de esa variable.


# Variables (para poder fijar valores, o interaccion con el usuario)
Report inspector -> Parameters -> Boton derecho -> New 
Definimos Nombre y tipo de dato (Java)
Si le decimos prompt, es para que se le pregunte al usuario por este dato.

Cuando lo subamos al usuario podemos definir que una variable sea mandatory.

Para poder usar estas variables tendremos que ir al editor de la query sql, y allí usar los parámetros (arrastrándolos desde la izquierda a la query)
Podemos definir un valor por defecto, así podremos usar tambień el query inspector, y usar el preview de las querys.
Si usamos fecha, el valor por defecto se pondrá como: new Date(milisegundos desde 1 de enero de 1970)
La fecha la podemos sacar como la unix epoch * 1000 (ESTA PARECE QUE NO FUCIONA).
Ponemos la fecha como: new Date(213,5,30)  2013/5/30
El año se pone como: AÑO_QUE_QUEREMOS - 1900


# Subir report al server.
Abrir el reporte en la vista de Designer
Pinchamos con el botón derecho sobre la carpeta donde queremos subirlo.
Agregar JasperServer Report.
Le damos nombre e id.
Locally defined -> Get source from currente opened report.
En el siguiente punto tenemos que seleccionar el datasource del repositorio que metimos antes en el repo del server.
Si elegimos "Locally defined", sube el datasource embedido dentro del report, y luego no lo podremos reusar. Asi que mejor esta opción no.

Ahora podemos abrir el report pinchando en el Main.jrxml.
Si necesitamos imágenes, subreports, .jar, etc lo meteremos en la carpeta "Resources".

En "Input controls" meteremos variables que queremos que puedan tocar los usuarios. Por ejemplo fecha de inicio y de fin que usamos en la crosstab que creamos de ejemplo
Crearemos un directorio bajo el directorio del server donde meteremos todos los "Inputs controls".
Con el botón derecho crearemos un en ese directorio (fuera del report, para poder reusarlo).
El "Input control" debe llamarse igual que el que usamos para el reporte. Así es como jasper sabrá como enlazarlo. Podemos ver el nombre de la variable viendo el código XML del Main.jrxml
Como queremos una fecha, selecciono "Single Value"
Tenemos que asociarle un Datatype (mejor crearlo previamente en nuestro directorio para poder reusarlo)

Para que el report use los Input Type que hemos creado en nuestro directorio, iremos al directorio "Input controls" del report, y los linkaremos con los que tenemos en nuestro repo.

Una vez hecho esto ya podremos ir al JasperServer y ejecutar el report desde allí.
Boton derecho sobre el directorio -> Add -> Input Control


Si abrimos un repo del server, nos abrirá una copia. Tras realizar la modificación tendremos que reescribir el del servidor.



para usar una lista como filtro de entrada a un report: 1) iReport: definir parameter de tipo Collection (ejemplo de Default value:java.util.Arrays.asList("Active", "Canceled", "New")); 2) En JasperServer: definir query con los datos que queramos mostrar en el desplegable y definir input control Multiselect query.
En iReport para usar los resultados seleccionados en un parámetro tipo lista en una query: select Service, Severity, TicketID

from CSV_output

where $X{ IN,Status,status}

and SubmissionDate >= $P{fechainicio} and SubmissionDate < $P{fechafinscheduled}



# Subdatasets
Si usar distintas tablas en un mismo report tenemos que usar nuevas querys (subdatasets).
Pinchar con el botón derecho sobre el report, y Add DataSet.

Las variables del dataset general no los veremos en este dataset. Tendremos que crearlos de nuevos.
Para unir esas nuevas variables a las "oficiales" (del dataset principal).
Pincharemos con el botón derecho sobre el chart/tabla o lo que sea, elegiremos "Chart detail".
Pestaña Dataset, en la parte de Parameters.
Tenemos que elegir cada uno de nuestros parámetros, e igualarlo a la varaible del dataset general.

Al crear los gráficos o tablas lo que primero nos pregunta es que dataset usar.




# Variables
Es XML, así que si una variable usa a otra, la usada tiene que estar definida antes.
