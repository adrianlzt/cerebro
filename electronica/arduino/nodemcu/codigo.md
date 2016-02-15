Ejemplos:
http://www.nodemcu.com/docs/net-socket-module/
https://github.com/nodemcu/nodemcu-firmware/tree/master/examples


http://www.foobarflies.io/a-simple-connected-object-with-nodemcu-and-mqtt/

Estructura de código:

a config.lua file that will hold the configuration, and editable variables
a setup.lua file that will take care of setuping the connectivity
an application.lua file that will hold our app code
the init.lua file that will not be compiled (you can't)

To compile a file :
 node.compile('file.lua');

 Compile your Lua scripts in order to reduce their memory usage

The init.lua file is pretty special on the NodeMCU since it's automatically played on startup. This means that everything we put in there will be executed the second the NodeMCU is starting.
Remember : the init file is not a module, and is not compiled.


Para desarrollar, usar un fichero test.lua y ejecutarlo con:
dofile('test.lua');

Por que si tenemos un init.lua erróneo y nos resetea todo el rato el dispositivo tendremos que reflashearlo.
