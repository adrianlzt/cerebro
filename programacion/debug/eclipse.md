http://es.slideshare.net/marckhouzam/real-time-debugging-using-nonintrusive-tracepoints-to-debug-live-systems-3556718

Usar tunel ssh para conectar con el gdb server.

Debugging Using a Remote GDB Session (gdbserver)
http://pforray.wordpress.com/2011/07/26/debug-remoto-en-eclipse-con-gdbserver/
Window -> Show view -> C/C++
Window -> Open Perspective -> Debug
Run -> Debug Configurations
  C/C++ Remote Application
  New
    Connection
      System-type: SSH
        Host name: ...


Si quiero debugear un programa del que tengo el código fuente, puedo importarlo como proyecto con código File > New project > Makefile project with existing code
En una carpeta del eclipse aparecerán los binarios que antes habré compilado con -DDEBUG, botón derecho, debug.
Para pasarle parámetros a la ejecución, vamos a propiedades del debug, arguments.
