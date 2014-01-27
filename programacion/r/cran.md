http://cran.r-project.org/

There are more libraries available on the servers of the Comprehensive R Archive Network, or CRAN. They can add anything from new statistical functions to better graphics capabilities. Better yet, installing any of them is just a command away.

install.packages("ggplot2")
Si lo ejecutamos como root lo instalará en las librerías del sistema. Si es un usuario normal, lo instalar en librerías particulares para ese usuario.

Si es la primera vez que lo ejecutamos nos saldrá una ventana preguntándonos que Mirror queremos usar.


Ayuda para estos paquetes nuevos:
help(package="ggplot2")

installed.packages()

Para usar los paquetes tendremos que cargar la librería que instala: library(ggplot2)
