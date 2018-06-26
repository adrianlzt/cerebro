http://en.wikipedia.org/wiki/Java_Management_Extensions

Java Management Extensions (JMX) is a Java technology that supplies tools for managing and monitoring applications, system objects, devices (e. g. printers) and service oriented networks. Those resources are represented by objects called MBeans (for Managed Bean). In the API, classes can be dynamically loaded and instantiated. Managing and monitoring applications can be designed and developed using the Java Dynamic Management Kit.


Para inspeccionar lo que podemos obtener usar: jconsole (instalado con java)
https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html

Tambien hay una cli:
http://wiki.cyclopsgroup.org/jmxterm/
java -jar jmxterm...


# Protocolo
RMI
"JSR-160 connectors are highly Java centric where its default protocol RMI is not available outside the Java universe"



# JSON
Parece que la gente usa Jolokia para exponer las métricas de JMX en formato JSON para ser más fáciles de tratar.
