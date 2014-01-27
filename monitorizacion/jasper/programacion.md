Mirar en el foro, donde Mario explicó como programar.

Se puede tener que meter código en .jar para hacer ciertas cosas.
Usaremos el Eclipse con tres librerias extras:
  jfreechart
  jcommon
  jasperreports

Coger estas librerias del server.

Info sobre la libreria jfreechart
https://colabora.tid.es/devops/bookshop/Documents/TheMagicBooks/jfreechart-1.0.14-A4.pdf
Si nos bajamos el jfreechart de la web, trae un .jar con un montón de ejemplos.

Los .jar que generásemos se meterían en la carpeta Resources de nuestro informe.



Para ver los ejemplos de Jfree, podéis descargar el zip desde la página de http://www.jfree.org/jfreechart/, descomprimirlo y ejecutar jfreechart-1.0.16-demo
o bien en la misma página http://www.jfree.org/jfreechart/ hay un link http://www.jfree.org/jfreechart/jfreechart-1.0.16-demo.jnlp que permite ejecutar las demos de forma online
Recordad que el código de cada demo no está accesible, pero es fácilmente localizable en google
Viendo cómo es ese código, podremos modificar lo necesario para adaptarlo a nuestras necesidades y construir nuestro propio java
*********************************************************
Las librerias que se necesitan para nuestro proyecto java: jfreechart, jcommon y jasperreports library. La documentación de jfreechart y jasperreports library está en el Foro de DevOps
***********************************************************
iReport - ¿cómo incluir un jar para poder usar su código?
Herramientas > Opciones > iReport: Classpath: Add Jar
para indicar a un gráfico que use ese JAR, seleccionarlo e incluir el nombre de nuestra clase java en el campo "Customizer Class" en las properties del gráfico
Si se desean pasar valores desde iReport al código Java, se pueden definir propiedades para el gráfico: seleccionar gráfico, propiedades, campo "Properties expressions"
**************************************************************
JasperServer - ¿cómo incluir un jar en el report que genero desde iReport?
en la carpeta "Resources" que se autogenera bajo el report: botón derecho: Add > Jar Archive y seleccionar el .jar generado a partir de nuestro código.
***************************************************************



# PASOS para customizar una gráfica: http://jasper-bi-suite.blogspot.com.es/2013/06/jfree-bar-chart-customization-in.html

Abrir el jFreeChartDemo para ver que ejemplos nos puede valer.
Buscar el código en google de ese .java: https://code.google.com/p/test-chart/source/browse/trunk/src/main/java/es/efor/plandifor/demo/
Usar la documentación de jfreechart (el pdf)
Abrir eclipse e importar las librerias necesarias: Boton derecho sobre el proyecto -> Build Path -> Add External Libraries (usar las versiones del servidor)
  jasperreports
  jcommon
  jfreechart

Dejo un java de ejemplo en: BarChartCustomizer.java
La clase que creamos siempre "implements JRChartCustomizer"
Luego obtenemos el plot: Plot plot = chart.getPlot();
Para cada tipo de plot le decimos que hacemos: if (plot instanceof CategoryPlot)) { ... }
Para generar el jar (sobre el proyecto): export -> java -> jar

Para agregar nuestro código personalizado: Herramientas -> Opciones -> iReport -> Classpath -> Add Jar (marcar Reloadable para que cargue la libreria cada vez)
Para subir el .jar al server: botón derecho sobre el directorio resources del reporte, add jar. Y tenemos que poner el ID igual que el nombre de la clase.
Y tenemos que subirlo cada vez que lo modifiquemos en local.

Para meter el jar en un gráfico, pinchamos sobre el gráficco, y vamos a la sección de propiedades (abajo a la izquierda), y damos a Customize Class, y tendremos que poner el nombre de nuestra clase que está en el jar.
También se le pueden pasar propiedades a la clase java -> Properties expression. Solo se podrán pasar variables de la query general (a lo mejor tambien de subdataset pero no sabemos)
También se pueden pasar expresiones.

Si es un report del servidor y tiene imágenes del servidor fallará el preview.
