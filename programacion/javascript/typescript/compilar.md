tsc fichero.ts

genera fichero.js


Se puede hacer que el navegador se encargue de "transcompile" el codigo typescript en javascript, pero no es recomendable si tenemos mucho código, porque la experiencia de usuario será lenta.


tsc -p src -w
  compila los .ts que haya por debajo de src/
  se mantiene corriendo para ir compilando al momento los cambios que hagamos sobre los .ts
