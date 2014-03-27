Podemos almacenar parámetros de la aplicación en: 
config/environments/*.rb

Podremos definir distintos valores según el entorno.
La variable la deberemos definir como
config.NOMBRE_QUE_QUERAMOS = "valor"
o
config.NOMBRE_QUE_QUERAMOS = :valor

Para hacer referencia a ella:
Rails.application.config.NOMBRE_QUE_QUERAMOS

Será necesario reiniciar el servidor para que coja las nuevas variables.
