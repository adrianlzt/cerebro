http://en.wikipedia.org/wiki/Java_Management_Extensions

Java Management Extensions (JMX) is a Java technology that supplies tools for managing and monitoring applications, system objects, devices (e. g. printers) and service oriented networks. Those resources are represented by objects called MBeans (for Managed Bean). In the API, classes can be dynamically loaded and instantiated. Managing and monitoring applications can be designed and developed using the Java Dynamic Management Kit.

JMX Remote API (JSR 160)

RMI parece que es el protocolo por defecto usado por JSR160.
Parece que no hay conectores para RMI fuera del mundo Java, excepto tal vez: https://metacpan.org/source/JMX::Jmx4Perl


Para inspeccionar lo que podemos obtener usar: jconsole (instalado con java)
https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html


Si queremos usar jconsole contra wildfly/jboss tendremos que pasar las librerias para que sepa conectar con remoting-jmx: mirar jboss.md


Tambien hay una cli:
http://wiki.cyclopsgroup.org/jmxterm/
java -jar jmxterm...


# Protocolo
RMI
"JSR-160 connectors are highly Java centric where its default protocol RMI is not available outside the Java universe"
RMI es la implementación de Java de las RPC (remote procedure call)

Cuando intento conectar con service:jmx:rmi:///jndi/rmi://IP:9999/jmxrmi veo que tras la apertura TCP el cliente envía un mensaje que contiene los caracters JRMI.

En cambio, cuando uso jconsole con service:jmx:remoting-jmx://IP:9999, tras la apertura TCP el que contesta es el servidor enviando su hostname.
Esto es lo que veo también cuando hago un netcat (el server enviando su hostname)






# JSON
Parece que la gente usa Jolokia para exponer las métricas de JMX en formato JSON para ser más fáciles de tratar.
