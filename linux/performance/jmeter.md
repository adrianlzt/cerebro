https://jmeter.apache.org/

Crear planes de forma más sencilla: rubyjmeter.md
SaaS: flood.io (load testing)

Apache JMeter may be used to test performance both on static and dynamic resources (Files, Web dynamic languages - PHP, Java, ASP.NET, etc. -, Java Objects, Data Bases and Queries, FTP Servers and more). It can be used to simulate a heavy load on a server, group of servers, network or object to test its strength or to analyze overall performance under different load types. You can use it to make a graphical analysis of performance or to test your server/script/object behavior under heavy concurrent load.


Ubuntu, para testear HTTP: apt-get install jmeter-http
Arch: packer -S jmeter
CentOS: Descargar de http://jmeter.apache.org/download_jmeter.cgi
        Hace falta java: yum install -y java-1.8.0-openjdk

Plugins útiles:
http://jmeter-plugins.org/downloads/all/
Standar y ExtrasLibs.
Descomprimir el .zip en la carpeta raiz de jmeter


https://jmeter.apache.org/usermanual/build-test-plan.html
https://jmeter.apache.org/usermanual/build-web-test-plan.html


Ejemplo para hacer peticiones TCP: http://abh1sh3k.blogspot.com.es/2013/11/simple-tcp-server-and-jmeter-as-client.html?q=jmeter


The Thread Group tells JMeter the number of users you want to simulate, how often the users should send requests, and the how many requests they should send.
Para añadirlo, botón derecho sobre "Plan de pruebas" -> Add -> Threads -> Thread Group

  Number of threads <- número de usuarios a simular
  Ramp-Up <- tiempo hasta que arranca todos los usuarios. Ejemplo, ramp-up=5s, users=5, arrancará un user cada segundo
  Loop count <- cuantas veces se repetirá el test
 
Ahora definiremos los defaults para los http request. Lo crearemos colgando del "Thread group".
Aqui podemos definir por ejemplo el Server Name, en el caso de que todas las HTTP Request vayan a ir al mismo servidor.

Cookies, podemos agregar cookies. Cada thread tendrá las suyas, que serán compartidas entre todos los objetos HTTP request.

HTTP Request, ahora agregaremos peticiones. Las pondremos colgando del JMeter Users. Add -> Sampler -> HTTP Request


Siempre deberemos añadir un Listener, que se encargará de recabar los resultados, y presentarlos gráficamente.
Lo colgaremos de JMeter Users, y elegiremos el Listeners -> Graph Results
Deberemos seleccionar el fichero donde se escribirán los datos.

Si agregamos un tipo "Generate Summary results", nos dará una línea resumen por el stdout
"Summary report" nos dará una tabla con los valores útiles del test.
"Save responses to a file", nos generá ficheros de texto con nombre "PREFIX$(fecha).ext. Útil si tenemos un error, ya que en el fichero se escribirá el fallo java, y pondrá la extensión .unknown.
Creará los ficheros de texto en el PATH desde donde hayamos arrancando jmeter, y un fichero por request.


Logging in ->  https://jmeter.apache.org/usermanual/build-web-test-plan.html#logging_in
Crear un HTTP Request POST.
Deberemos analizar el código http para ver a donde hay que enviar el post, y los parámetros a enviar.
Se puede usar el recorder para que lo pille automáticamente.



## Recorder ##
https://jmeter.apache.org/usermanual/component_reference.html#HTTP_Proxy_Server
The HTTP(S) Test Script Recorder allows JMeter to intercept and record your actions while you browse your web application with your normal browser. JMeter will create test sample objects and store them directly into your test plan as you go (so you can view samples interactively while you make them).



# Consola
jmeter -n -t testplan.jmx -l listener.jtl
