https://webpack.js.org/
http://survivejs.com/webpack/introduction/

Genera un único fichero js a partir de todos nuestros ficheros js, typescript, babel, etc


## DLL
Para módulos node que estemos usando, podemos generar un único fichero "dll" (compiled bundle).
Podemos generar este fichero porque, en principio, no vamos a tocar el código de esos ficheros.
Tener este dll ahorra mucho tiempo en la compilación de nuestra app.

Mirar ejemplo en programacion/javascript/reactjs/webpack.debug.dll.config.js
