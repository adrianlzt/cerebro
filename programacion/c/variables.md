tipos_de_datos.md
typedef.c


Las variables debemos inicializarlas. No hacerlo funciona (saltara un warning), pero puede conducir a bugs y problemas de seguridad.

int var = 5;


# Locales / automaticas
Definidas dentro de una función.
Su scope es solo esa función.



# static
Estas variables son inicializadas (se les asignará un valor por defecto, 0) en el arranque y mantienen su valor hasta el final del programa.

void contador() {
  static int contador;
  contador++;
}
Si llamamos varias veces a contador() iremos viendo como crece el valor.

Podemos definir el valor de una variable "static" al definirla.
Este valor deberá ser un valor estático, conocido por el compilador en el tiempo de compilación (C++ no tiene este requisito).
Esa inicialización del valor solo ocurrirá una vez!!:
void contador() {
  static int contador = 10;
  contador++;
}
Ahora veremos como los valores van creciendo desde 10.


## Compartir variable static entre funciones
Definir las variables static a nivel de fichero (el scope será únicamente el fichero).
Si definimos una variable fuera de cualquier función y no ponemos el static, esa variable será compartida por todos los ficheros del programa.
Puede parecer útil, pero llevará a problemas y no debe hacerse (problemas como usar dos veces la misma variable sin acordarnos que ya está siendo usada)

static int var = 3;
void up() {
  var++;
}
void down() {
  var--;
}
