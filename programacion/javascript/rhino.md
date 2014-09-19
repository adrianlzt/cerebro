Ejecutar programas javascript en la consola de linux.

apt-get install rhino

rhino fichero.js

Con trazas de debug:
rhino -debug fichero.js



rhino -e "print('hola');"


# Argumentos #
for (i in arguments) {
  print(arguments[i])
}

$ rhino args.js uno dos tres



Para salir de un programa:
throw new Error("Faltan parametros");
