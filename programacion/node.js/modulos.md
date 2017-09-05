https://journal.paul.querna.org/articles/2011/12/17/technology-cloud-monitoring/

Mirar casi al final


Instalar módulo
nmp install --save express
Me baja los módulos en el directorio que esté

Instalar una version
npm install cosa@3.4.5


Instalar un módulo de forma global:
npm -g install NOMBRE


npm i PAQUETE --save-dev
  guardarlo en el package.json como dep de desarrollo


Si estamos en un dir de un proyecto con su package.json, para instalar las dependencias:
npm install


# Develop
npm init ..


Subir versión:
npm version [patch|minor|major]

Publicar
npm publish


# Scopes
https://docs.npmjs.com/getting-started/scoped-packages
Podemos tener distintos registros de NPM asociados a distintos SCOPES para poder hacer cosas tipo
nmp install @MYORG/mipaquete



# Dividir el codigo en ficheros
http://debugmycode.com/2016/03/05/how-to-split-nodejs-code-in-multiple-files/

utils.js:
exports.geolocation = (...)
exports.rotate = function(array, times){ ... }

app.js:
import {geolocation,rotate} from './utils.js';
