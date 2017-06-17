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

VIII. Concurrency
Scale out via the process model

IX. Disposability
Maximize robustness with fast startup and graceful shutdown

X. Dev/prod parity
Keep development, staging, and production as similar as possible

XI. Logs
Treat logs as event streams

XII. Admin processes
Run admin/management tasks as one-off processes
