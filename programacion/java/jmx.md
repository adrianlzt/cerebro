http://en.wikipedia.org/wiki/Java_Management_Extensions

Java Management Extensions (JMX) is a Java technology that supplies tools for managing and monitoring applications, system objects, devices (e. g. printers) and service oriented networks. Those resources are represented by objects called MBeans (for Managed Bean). In the API, classes can be dynamically loaded and instantiated. Managing and monitoring applications can be designed and developed using the Java Dynamic Management Kit.

JMX Remote API (JSR 160)

RMI parece que es el protocolo por defecto usado por JSR160.
Parece que no hay conectores para RMI fuera del mundo Java, excepto tal vez: https://metacpan.org/source/JMX::Jmx4Perl


Para inspeccionar lo que podemos obtener usar: jconsole (instalado con java) (MUCHO mejor visualvm)
https://docs.oracle.com/javase/7/docs/technotes/guides/management/jconsole.html


Si queremos usar jconsole contra wildfly/jboss tendremos que pasar las librerias para que sepa conectar con remoting-jmx: mirar jboss.md


Tambien hay una cli:
http://wiki.cyclopsgroup.org/jmxterm/
java -jar jmxterm...

Y otra herramientra gráfica: visualvm
Nos da una interfaz donde es sencillo almacenar un monton de conexiones a distintos servers y/o hosts.
Una vista de los threads mejor.
Para poder añadir más funcionalidad instalar plugins:
  VisualGC
  VisualVM-JConsole
  VisualVM-MBeans
Para usarla con jboss mirar jboss.md
https://blog.akquinet.de/2012/11/01/connecting-visualvm-with-a-remote-jboss-as-7-eap6-jvm-process/

# Protocolo
RMI
"JSR-160 connectors are highly Java centric where its default protocol RMI is not available outside the Java universe"
RMI es la implementación de Java de las RPC (remote procedure call)

Cuando intento conectar con service:jmx:rmi:///jndi/rmi://IP:9999/jmxrmi veo que tras la apertura TCP el cliente envía un mensaje que contiene los caracters JRMI.

En cambio, cuando uso jconsole con service:jmx:remoting-jmx://IP:9999, tras la apertura TCP el que contesta es el servidor enviando su hostname.
Esto es lo que veo también cuando hago un netcat (el server enviando su hostname)



# GC cpu
Visualvm nos muestra el consumo de CPU del GC.
Esto lo hace a partir del tiempo del GC con los calculos que podemos ver aqui:
https://github.com/oracle/visualvm/blob/1d58f7ea1e3c65a996df75395a459da3a87a7b7b/plugins/tracermonitor/src/org/graalvm/visualvm/modules/tracer/monitor/CpuMonitorProbe.java#L79

Coge el tiempo de procesado del GC (hay dos GC, PS MarkSweep y PS Scavenge): java.lang:type=GarbageCollector,name=PS MarkSweep, atributo CollectionTime
Lo multiplica por 1M y divide entre el número de procesadores (java.lang:type=OperatingSystem attributo AvailableProcessors)
Luego hace el delta con el anterior valor calculado.
Posteriormente multiplica ese valor por 1000 (para convertirlo en ms) y lo divide entre el tiempo que ha pasado desde el startTime (java.lang-Runtime-StartTime). El calculo del tiempo que ha pasado lo hace cogiendo él (visualvm) la hora actual y restando el startTime)


El CollectionTime son ms
El CollectionCount son número de veces que ha sucedido
https://docs.oracle.com/javase/7/docs/api/java/lang/management/GarbageCollectorMXBean.html


# JSON
Parece que la gente usa Jolokia para exponer las métricas de JMX en formato JSON para ser más fáciles de tratar.
