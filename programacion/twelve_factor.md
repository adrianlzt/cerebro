https://12factor.net/

Como desarrollar aplicaciones SaaS:
 - setup declarativo
 - sin amoldarse a un SO concreto
 - listas para desplegarse en entornos cloud
 - con los mínimos cambios entre desarrollo y producción
 - que puedan escalar

Los doce factores:
I. Codebase
One codebase tracked in revision control, many deploys
Cada app su repositorio. Si hay varios repos, son varias apps (un sistema distribuído)
No debe haber varias apps compartiendo el mismo código, esa porción de código deberá ser una librería.

II. Dependencies
Explicitly declare and isolate dependencies
La app debe declarar explicitamente sus dependencias. requirements.txt, Gemfile, etc.
Nunca se deberá suponer que existe un determinado paquete en el SO.
Usar una "dependency isolation tool" para comprobar que estamos declarando todo lo que usamos.
Si necesitamos alguna herramienta externa (ej. ImageMagick) deberá estar "vendored", agregada como parte de la app.

III. Config
Store config in the environment
Todo lo que pueda variar entre entornos es configuración y deberá estar separado del código.
El código debe poder ser público (en el sentido de que no haya passwords, etc en el código)
La configuración irá en variables de entorno.
No usar "environments", porque tendremos problemas si luego necesitamos dos environments "staging" por ejemplo.

IV. Backing services
Treat backing services as attached resourceso
Cada servicio que necesite la app (ddbb, smtp, apis externas, etc) deberán ser accedidos mediante una URL (y puede que credenciales) almacenados en la configuración.
Cambiar un servicio por otro debe ser tan sencillo como cambiar la URL a donde apunta.
Estos recursos deben poder unirse y quitarse del despliegue bajo nuestro criterio.

V. Build, release, run
Strictly separate build and run stages
Build: genera un ejecutable a partir del código (puede ser complejo, un developer la habrá lanzado y puede estar vigilando el proceso de build)
Release: genera una release a partir de un build y una configuración.
Run: ejecutar una release en un entorno. Debe ser simple de ejecutar y automático (en caso de que se reinicie el servidor o la app se rompa y sea rearrancada por el process manager)
     Debe tener el mínimo de "piezas móviles" para que pueda arrancar sin problemas, porque esto puede suceder cuando no hay nadie disponible.
Usar herramientas que nos permitan rollback
Cada release debe tener un número único identificativo.

VI. Processes
Execute the app as one or more stateless processes
Procesos stateless y que no comparten nada entre sí.
Lo que deba perdurar debe encontrarse en un servicio con estado a parte, una base de datos.
El filesystem se podrá usar como un corto caché para una petición determinada.
No usar sticky sessions. Usar otras opciones para almacenar el estado de sesión como memcached o redis.

VII. Port binding
Export services via port binding
La app debe ser autocontenida y exponerse via un puerto.

VIII. Concurrency
Scale out via the process model
La app debe ser "first class citizen". Debe ser un proceso (no depender de que lo ejecute otro tercer servicio, eg: httpd o jvm)
La idea es escalar arrancando más procesos y dividiendo el trabajo en procesos distintos.
No deben correr en background, ni gestionar crashes, logs, etc, esa gestión se debe encargar el process manager (systemd por ejemplo)

IX. Disposability
Maximize robustness with fast startup and graceful shutdown
Las apps deben poder pararse correctamente (con un SIGTERM) y crearse en cualquier momento.
El parado correcto implicará, limitar las conexiones entrantes y terminar con las que estén en proceso.
En caso de long pooling, el cliente desarrollado deberá poder reconectar con otro servidor en caso de que el actual se pare.
Para los workers un parado correcto será devolver el job a la cola (sin haberlo procesado)
Las jobs deben ser "reentrantes" (si fallan a mitad, pueden volverse a ejecutar), típicamente se conseguirá haciendo "transacciones" (o se realiza la operación entera, o no se realizada nada) o idempotentes (puede realizarse múltiples veces la misma operación obteniendo siempre el mismo resultado)
Habrá que reducir el tiempo de arranque todo lo posible.
También deberan ser resistentes ante muertes abruptas (por ejemplo el gestor de colas Beanstalkd retorna las jobs a la cola cuando un cliente se desconecta o da time out)

X. Dev/prod parity
Keep development, staging, and production as similar as possible
Reducir los "gaps" entre desarrollo y producción:
 - reducir el tiempo entre que el desarrollador mete una nueva funcionalidad hasta que esta sale a producción (horas a ser posible)
 - hacer que la gente que desarrolla el código esté involucrada en su despliegue y pueda ver su comportamiento en producción
 - mantener el entorno de desarrollo lo más parecido posible al de producción

Para los backing services (bbdd, queues) intentar que sean los mismos que en producción. Aunque haya librerias que nos abstraigan de lo que hay por debajo, siempre puede haber pequeñas diferencias que funcionen en desarrollo, pasen los tests y luego fallen en producción. Usar las mismas versiones.
Para los desarrolladores es facil que puedan montar réplicas de producción usando vagrant con alguna herramienta de despliegue (ansible, puppet, chef)

XI. Logs
Treat logs as event streams
Las apps deben escribir su "event stream" (sus logs) a stdout. El "execution environment" será el encargado de gestionar esos logs.

XII. Admin processes
Run admin/management tasks as one-off processes
A veces será necesario realizar tareas de administración sobre las apps, por ejemplo migraciones de la base de datos, arrancar el REPL para hacer algo manual o ejecutar algún script para solventar un problema.
Estos comandos administrativos deben desplegarse junto con la release.
Deben ser ejecutados en un entorno identico a las apps.
