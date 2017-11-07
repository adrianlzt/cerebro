Para extraer un .jar/.war se puede hacer con unzip.
Otra forma es con el comando jar: jar xf archivo.jar

Para volver a empaquetar el contenido descomprimido de nuevo en un .jar (estando en el directorio donde hemos descomprimido):
jar cvfm archivo.jar META-INF/MANIFEST.MF .

El nombre del nuevo .jar tiene que ser igual al que descomprimimos.

En ubuntu, el comando jar lo podemos encontrar en el paquete: default-jdk



Ejecutar:
java -jar fichero.jar
