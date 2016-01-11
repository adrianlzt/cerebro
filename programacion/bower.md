http://bower.io/

A package manager for the web

Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.


Instalar paquetes de javascript, css, etc.
Ejemplo:

d3.js
bootstrap
jquery
angujarjs

# Install
bower install package

Bajas el package y sus dependencias.
Lo deja en: bower_components/

# version especifica:
To install a specific version, append the GitHub tag using #:
bower install bootstrap#v4.0.0-alpha
